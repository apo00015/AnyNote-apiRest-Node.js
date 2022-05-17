const express = require('express'); // Framework para crear un servidor http
const router = express.Router();    // Módulo para agrupar rutas
const pool = require('../helpers/database');

/**
 * Método GET para obtener una nota, pasados sus claves primarias
 */
router.get('/', async function (req, res) {

    console.log(`Se quiere realizar un GET de para obtener una nota:`)
    try {
        // Obtenemos los parámteros del body
        const { planta, habitacion, cama, fechaActualizacion, emailUser } = req.body;
        const sqlQuery = 'SELECT * FROM tfg.Nota WHERE planta =? AND habitacion = ? AND cama = ? AND fechaActualizacion = ? AND emailCreado = ?';
        pool.query(sqlQuery, [planta, habitacion, cama, fechaActualizacion, emailUser], function (err, result, fields) {
            if (err)
                throw err;
            console.log(result);
            // Comprobamos si el resultado está vacio o no
            if (Object.keys(result).length === 0) {
                res.status(404).send('Recurso no encontrado')
                console.log(`Vacio`);
            } else {
                res.status(200).json(result);
            }

        });

    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * Método POST para insertar una nota en la base de datos
 */
router.post('/add', async function (req, res) {
    console.log("Se quiere realizar un POST para una nota");
    try {
        // Extraemos los datos de la nota
        const { planta, habitacion, cama, fechaActualizacion, observaciones1, observaciones2, emailCreado, ct_frecuenciaCardiaca, ct_frecuenciaRespiratoria, ct_temperatura, ct_presionArterial } = req.body;
        console.log(req.body)
        // Realizamos la consulta
        const sqlQuery = 'INSERT INTO tfg.Nota (planta, habitacion, cama, fechaActualizacion, observaciones1, observaciones2, emailCreado, ct_frecuenciaCardiaca, ct_frecuenciaRespiratoria, ct_temperatura, ct_presionArterial) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        pool.query(sqlQuery, [planta, habitacion, cama, fechaActualizacion, observaciones1, observaciones2, emailCreado, ct_frecuenciaCardiaca, ct_frecuenciaRespiratoria, ct_temperatura, ct_presionArterial], function (err, result) {
            if (err) {
                console.log(`ERROR al crear la nota::: ${err.message}`);
                res.status(400).send(err.message);
            }else{
                console.log(`No hay ningún eror`);
                res.status(200).json(result);; // Devolvemos el identificador del usuario
            }
           
        });



    } catch (err) {
        console.log("Ha ocurrido un error*******************************************************************")
        res.status(400).send(err.message);
    }
})

/**
 * Método DELETE para eliminar una nota de la base de datos
 */
 router.delete('/eliminar', async function(req,res){

    console.log(`Se quiere realizar DELETE de una nota:`);
    try {
        // Obtenemos el body
        console.log(req.body)
         // Extraemos los datos de la nota
         const {planta, habitacion, cama, fechaActualizacion, emailCreado} = req.body;
        // Realizamos la consulta
        const sqlQuery = 'DELETE FROM tfg.Nota WHERE planta = ? AND habitacion = ? AND cama = ? AND fechaActualizacion = ? AND emailCreado = ?';
        pool.query(sqlQuery, [planta, habitacion, cama, fechaActualizacion, emailCreado], function (err, result) {
            if (err){
                throw err;
            }
            if(result.affectedRows > 0){
                res.status(200).json(result);
                console.log(`Se ha borrado con éxito la nota`);
            }else{
                res.status(200).send(`No hay ningúna nota con esos datos`)
                console.log(`La nota no existe`);
            }
            
          });
        
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router; // Exportamos el router para poder utilizar las rutas definidas en la clase server