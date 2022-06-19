const express = require('express'); // Framework para crear un servidor http
const router = express.Router();    // Módulo para agrupar rutas
const pool = require('../helpers/database');

/**
 * Método POST para insertar una nota en la base de datos
 */
router.post('/add', async function (req, res) {
    try {
        // Extraemos los datos de la nota
        const { planta, habitacion, cama, fechaActualizacion, observaciones1, observaciones2, emailCreado, ct_frecuenciaCardiaca, ct_frecuenciaRespiratoria, ct_temperatura, ct_presionArterial } = req.body;
        // Realizamos la consulta
        const sqlQuery = 'INSERT INTO Nota (planta, habitacion, cama, fechaActualizacion, observaciones1, observaciones2, emailCreado, ct_frecuenciaCardiaca, ct_frecuenciaRespiratoria, ct_temperatura, ct_presionArterial) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        pool.query(sqlQuery, [planta, habitacion, cama, fechaActualizacion, observaciones1, observaciones2, emailCreado, ct_frecuenciaCardiaca, ct_frecuenciaRespiratoria, ct_temperatura, ct_presionArterial], function (err, result) {
            if (err) {
                res.status(400).send(err.message);
            }else{
                res.status(200).json(result);
            }
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
})

/**
 * Método DELETE para eliminar una nota de la base de datos
 */
 router.delete('/eliminar', async function(req,res){
    try {
         // Extraemos los datos de la nota
         const {planta, habitacion, cama, fechaActualizacion, emailCreado} = req.body;
        // Realizamos la consulta
        const sqlQuery = 'DELETE FROM Nota WHERE planta = ? AND habitacion = ? AND cama = ? AND fechaActualizacion = ? AND emailCreado = ?';
        pool.query(sqlQuery, [planta, habitacion, cama, fechaActualizacion, emailCreado], function (err, result) {
            if (err){
                throw err;
            }
            if(result.affectedRows > 0){
                res.status(200).json(result);
            }else{
                res.status(200).send(`No hay ningúna nota con esos datos`)
            }
          });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * Método Put para compartir una nota
 */
 router.put('/compartir', async function(req,res){
    try {
         // Extraemos los datos de la nota
         const {planta, habitacion, cama, fechaActualizacion, emailCreado, compartida} = req.body;
        // Realizamos la consulta
        const sqlQuery = 'UPDATE Nota SET compartida = ? WHERE planta = ? AND habitacion = ? AND cama = ? AND fechaActualizacion = ? AND emailCreado = ?';
        pool.query(sqlQuery, [compartida, planta, habitacion, cama, fechaActualizacion, emailCreado], function (err, result) {
            if (err){
                throw err;
            }
            if(result.affectedRows > 0){
                res.status(200).json(result);
            }else{
                res.status(200).send(`No hay ningúna nota con esos datos`)
            }
          });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router; // Exportamos el router para poder utilizar las rutas definidas en la clase server