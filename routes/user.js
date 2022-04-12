const express = require('express'); // Framework para crear un servidor http
const router = express.Router();    // Módulo para agrupar rutas
const pool = require('../helpers/database');

/**
 * Método GET para obtener usuarios dado un email
 */
router.get('/:email', async function(req,res){

    console.log(`Se quiere realizar un GET del usuario con email: ${req.params.email}`)
    try {
        const sqlQuery = 'SELECT * FROM tfg.Usuario WHERE email=?';
        pool.query(sqlQuery, [req.params.email], function (err, result, fields) {
            if (err) 
                throw err;
            console.log(result);
            // Comprobamos si el resultado está vacio o no
            if(Object.keys(result).length === 0){
                res.status(404).send('Recurso no encontrado')
                console.log(`Vacio`);
            }else{
                res.status(200).json(result);
            }
            
          });
        
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * Método POST para insertar un usuario
 */
router.post('/register', async function(req,res) {
    console.log("Se quiere realizar un POST");
    try {
        // Extraemos los datos del body
        const {email, nombre} = req.body;
        console.log(`El email recibido es: ${email} y el nombre recibido es: ${nombre}`);

        // Realizamos la consulta
        const sqlQuery = 'INSERT INTO tfg.Usuario (email, nombre) VALUES (?,?)';
        pool.query(sqlQuery,[email, nombre], function (err, result) {
            if (err){
                res.status(400).send(err.message);
            } 
            console.log(`No hay ningún eror`);
            res.status(200); // Devolvemos el identificador del usuario
        });

        

    } catch (err) {
        console.log("Ha ocurrido un error*******************************************************************")
        res.status(400).send(err.message);
    }
})

/**
 * Método DELETE para eliminar un usuario pasado un email
 */
 router.delete('/eliminar/:email', async function(req,res){

    console.log(`Se quiere realizar DELETE del usuario con email: ${req.params.email}`);
    try {
        // Realizamos la consulta
        const sqlQuery = 'DELETE FROM tfg.Usuario WHERE email = ?';
        pool.query(sqlQuery, [req.params.email], function (err, result) {
            if (err){
                throw err;
            }
            if(result.affectedRows > 0){
                res.status(200).json(result);
                console.log(`Se ha borrado con éxito el usuario con email: ${req.params.email}`);
            }else{
                res.status(404).send(`No hay ningún usuario con el email: ${req.params.email}`)
            }
            
          });
        
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * Método PUT para actualizar un usuario de la base de datos
 */
 router.put('/update/:email', async function(req,res) {
    console.log(`Se quiere realizar un PUT del usuario con id: ${req.params.email}`);
    try {
        // Extraemos los datos del body, los cuales serán los nuevos email y password
        const {email, nombre,fechaActualizacion} = req.body;
        console.log(`El email recibido es: ${email}  y la última fecha de actualización es del: ${fechaActualizacion}`);

        // Realizamos la consulta
        const sqlQuery = 'UPDATE tfg.Usuario SET FechaActualizacion = ? WHERE email = ?';
        pool.query(sqlQuery,[fechaActualizacion,email], function (err, result) {
            if (err){
                throw err;
            }
                
            console.log(result);
            if(result.changedRows > 0){
                console.log(`Se ha modificado con éxito:`);
                res.status(200).json(result); // Devolvemos el identificador del usuario
            }else{
                res.status(404).send("No se han realizado los cambios");
            }
            
        });

    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router; // Exportamos el router para poder utilizar las rutas definidas en la clase server