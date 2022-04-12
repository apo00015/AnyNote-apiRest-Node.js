const mysql = require('mysql'); // Requerimos el módulo de mysql

// Creamos la conexión, es similar al createConecction
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
});



// Conectamos con la base de datos y comprobamos si hay errores
pool.getConnection((err, connection) => {
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('Database connection was refused');
        }
    }
    console.log("conexion exitosa")
    if(connection) connection.release();

    return;
});

module.exports = pool; // Exportamos el módulo para utilizar la base de datos
