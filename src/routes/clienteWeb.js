const express = require('express'); // Framework para crear un servidor http
const router = express.Router();    // Módulo para agrupar rutas
const pool = require('../helpers/database');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithPopup, GoogleAuthProvider } = require('firebase/auth');

/**
 * Método GET para obtener una nota, pasados sus claves primarias
 */
router.get('/:email', async function (req, res) {
    // Realizamoos la consulta
    try {
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

        pool.query(sqlQuery, [req.params.email], function (err, result, fields) {
            if (err)
                throw err;
            // Comprobamos si el resultado está vacio o no
            if (Object.keys(result).length === 0) {
                res.render("notes/list", { notas: result });
            } else {
                res.render("notes/list", { notas: result ,logueado: true});
            }
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router; // Exportamos el router para poder utilizar las rutas definidas en la clase server