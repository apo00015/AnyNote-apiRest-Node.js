const express = require('express'); // Framework para crear un servidor http
const router = express.Router();    // Módulo para agrupar rutas
const pool = require('../helpers/database');
var correoUsuario = require("../Utils/util")
/**
 * Método GET para obtener una nota, pasados sus claves primarias
 */
 router.get('/:emailUser', async function (req, res) {

    console.log(`Se quiere realizar un GET de para obtener todas las notas que tiene acceso un usuario: ${correoUsuario}`)
    try {
        // Obtenemos los parámteros del body
        const sqlQuery =
            'SELECT n.planta, n.habitacion, n.cama, n.fechaActualizacion, n.observaciones1, n.observaciones2, ' +
            'n.ct_frecuenciaCardiaca, n.ct_frecuenciaRespiratoria, n.ct_temperatura, n.ct_presionArterial, n.emailCreado ' +
            'FROM Nota n, UsuarioNotaCrossRef u_n ' +
            'WHERE u_n.email = ? ' +
            'AND  u_n.planta = n.planta ' +
            'AND u_n.habitacion = n.habitacion ' +
            'AND u_n.cama = n.cama ' +
            'AND u_n.fechaActualizacion = n.fechaActualizacion ' +
            'AND u_n.emailCreado = n.emailCreado ' +
            'ORDER BY n.fechaActualizacion ASC';

        pool.query(sqlQuery, [req.params.emailUser], function (err, result, fields) {
            if (err)
                throw err;
            console.log(result);
            // Comprobamos si el resultado está vacio o no
            if (Object.keys(result).length === 0) {
                res.render("notes/list", { notas: result });
            } else {
                res.render("notes/list", { notas: result });
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router; // Exportamos el router para poder utilizar las rutas definidas en la clase server