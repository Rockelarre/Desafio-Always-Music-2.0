// Importar módulos necesarios
const { Pool } = require('pg');

// Capturando argumentos por línea de comandos
const argumentos = process.argv.slice(2);

let arg_accion = argumentos[0];
let arg_1 = argumentos[1];
let arg_2 = argumentos[2];
let arg_3 = argumentos[3];
let arg_4 = argumentos[4];

// Objeto con información de configuración
const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'Always_Music',
    password: 'password',
    port: 5432,
    max:20,
    idleTimeoutMillis:5000,
    connectionTimeoutMillis:2000,
};

// Nuevo objeto de la clase Pool()
const pool = new Pool(config);


// Opción para ingresar un nuevo registro
if  (arg_accion == 'nuevo') {

    async function ingresar(nombre,rut,curso,nivel) {

        pool.connect( async (error_conexion,client,release) => {

            if ( error_conexion) return console.error(error_conexion.code);

            const SQLQuery = {
                name:'ingresar-usuario',
                text: 'INSERT INTO estudiantes (nombre,rut,curso,nivel) VALUES ($1,$2,$3,$4) RETURNING *',
                values: [nombre,rut,curso,nivel],
            }

            try {
                const res = await client.query(SQLQuery);
                console.log(`El estudiante ${res.rows[0].nombre} agregado con éxito.`);    
            
            } catch (error_consulta){
                console.log(error_consulta.code)
            }

            release();
            pool.end();
        })
    }

    ingresar(arg_1,arg_2,arg_3,arg_4);
}

// Opción para mostrar un registro que coincida con el rut ingresado por comando
if (arg_accion == 'rut') {

    async function consulta_rut(rut) {

        pool.connect( async (error_conexion,client,release) => {

            if ( error_conexion) return console.error(error_conexion.code);

            const SQLQuery = {
                name:'consulta-por-rut',
                text: 'SELECT * FROM estudiantes WHERE rut = $1',
                values: [rut],
            }

            try {
                const res = await client.query(SQLQuery);
                console.log(res.rows[0]);    
            
            } catch (error_consulta){
                console.log(error_consulta.code)
            }

            release();
            pool.end();
        })
    }

    consulta_rut(arg_1);
}

// Opción para mostrar todos los registros
if (arg_accion == 'consulta') {

    async function consultar_todos(){

        pool.connect( async (error_conexion,client,release) => {

            if ( error_conexion) return console.error(error_conexion.code);

            const SQLQuery = {
                name:'consultar-usuarios',
                text: 'SELECT * FROM estudiantes',
                values: [],
            }

            try {
                const res = await client.query(SQLQuery);
                console.log(res.rows);    
            
            } catch (error_consulta){
                console.log(error_consulta.code)
            }

            release();
            pool.end();
        })
    }

    consultar_todos();        
}

// Opción para editar un registro que coincida con el rut ingresado por comando
if (arg_accion == 'editar') {

    async function editar(nombre,rut,curso,nivel){

        pool.connect( async (error_conexion,client,release) => {

            if ( error_conexion) return console.error(error_conexion.code);

            const SQLQuery = {
                name:'editar-usuario',
                text: 'UPDATE estudiantes SET nombre = $1, curso = $3, nivel = $4 WHERE rut = $2 RETURNING *',
                values: [nombre,rut,curso,nivel],
            }

            try {
                const res = await client.query(SQLQuery);
                console.log(`El estudiante ${res.rows[0].nombre} editado con éxito.`);    
            
            } catch (error_consulta){
                console.log(error_consulta.code)
            }

            release();
            pool.end();
        })
    }

    editar(arg_1,arg_2,arg_3,arg_4);
}

// // Opción para eliminar un registro que coincida con el rut ingresado por comando
if (arg_accion == 'eliminar') {

    async function eliminar(rut) {

        pool.connect( async (error_conexion,client,release) => {

            if ( error_conexion) return console.error(error_conexion.code);

            const SQLQuery = {
                name:'eliminar-usuario',
                text: 'DELETE FROM estudiantes WHERE rut = $1 RETURNING *',
                values: [rut],
            }

            try {
                const res = await client.query(SQLQuery);
                console.log(`Registro de estudiante con rut ${res.rows[0].rut} eliminado.`);    
            
            } catch (error_consulta){
                console.log(error_consulta.code)
            }

            release();
            pool.end();
        })
    }

    eliminar(arg_1);
}