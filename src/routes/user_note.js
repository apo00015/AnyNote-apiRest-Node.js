const express = require('express'); // Framework para crear un servidor http
const router = express.Router();    // Módulo para agrupar rutas
const pool = require('../helpers/database');

/**
 * Método GET para todas las notas de un usuario
 */
router.get('/:emailUser', async function (req, res) {
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
            // Comprobamos si el resultado está vacio o no
            if (Object.keys(result).length === 0) {
                res.status(404).send('Recurso no encontrado')
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * Método GET para obtener las siguientes notas requeridas por el usuario
 */
router.get('/:emailUser/:offset', async function (req, res) {
    try {
        // Obtenemos los parámteros del body
        const sqlQuery =
            'SELECT n.planta, n.habitacion, n.cama, n.fechaActualizacion, n.observaciones1, n.observaciones2, ' +
            'n.ct_frecuenciaCardiaca, n.ct_frecuenciaRespiratoria, n.ct_temperatura, n.ct_presionArterial, n.emailCreado ' +
            'FROM Nota n, UsuarioNotaCrossRef u_n ' +
            'WHERE u_n.email = ? ' +
            'AND u_n.planta = n.planta ' +
            'AND u_n.habitacion = n.habitacion ' +
            'AND u_n.cama = n.cama ' +
            'AND u_n.fechaActualizacion = n.fechaActualizacion ' +
            'AND u_n.emailCreado = n.emailCreado ' +
            'ORDER BY n.fechaActualizacion DESC ' +
            'LIMIT 10 OFFSET ?';

        pool.query(sqlQuery, [req.params.emailUser, parseInt(req.params.offset)], function (err, result, fields) {
            if (err)
                throw err;
            // Comprobamos si el resultado está vacio o no
            if (Object.keys(result).length === 0) {
                res.status(404).send('Recurso no encontrado')
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * Método GET para obtener las notas de un usuario dados unos parámetros
 */
router.get('/:emailUser/buscar/:planta/:habitacion/:cama', async function (req, res) {
    try {
        var sqlQuery
        // Creamos la consulta en función de los parámetros recibidos
        sqlQuery = 'SELECT n.planta, n.habitacion, n.cama, n.fechaActualizacion, n.observaciones1, n.observaciones2, ' +
            'n.ct_frecuenciaCardiaca, n.ct_frecuenciaRespiratoria, n.ct_temperatura, n.ct_presionArterial, n.emailCreado ' +
            'FROM Nota n, UsuarioNotaCrossRef u_n ' +
            'WHERE u_n.email = ? ' +
            'AND u_n.planta = n.planta ' +
            'AND u_n.planta = ? ' +
            'AND u_n.habitacion = n.habitacion ' +
            'AND u_n.habitacion = ? ' +
            'AND u_n.cama = n.cama ' +
            'AND u_n.cama = ? ' + 
            'AND u_n.fechaActualizacion = n.fechaActualizacion ' +
            'AND u_n.emailCreado = n.emailCreado';

        pool.query(sqlQuery, [req.params.emailUser, parseInt(req.params.planta), parseInt(req.params.habitacion), parseInt(req.params.cama)], function (err, result, fields) {
            if (err)
                throw err;
            // Comprobamos si el resultado está vacio o no
            if (Object.keys(result).length === 0) {
                res.status(404).send('Recurso no encontrado')
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * Método GET para obtener las notas de un usuario dados unos parámetros
 */
router.get('/:emailUser/buscar/:planta/:habitacion', async function (req, res) {
    try {
        var sqlQuery
        // Creamos la consulta en función de los parámetros recibidos
        sqlQuery = 'SELECT n.planta, n.habitacion, n.cama, n.fechaActualizacion, n.observaciones1, n.observaciones2, ' +
            'n.ct_frecuenciaCardiaca, n.ct_frecuenciaRespiratoria, n.ct_temperatura, n.ct_presionArterial, n.emailCreado ' +
            'FROM Nota n, UsuarioNotaCrossRef u_n ' +
            'WHERE u_n.email = ? ' +
            'AND u_n.planta = n.planta ' +
            'AND u_n.planta = ? ' +
            'AND u_n.habitacion = n.habitacion ' +
            'AND u_n.habitacion = ? '+ 
            'AND u_n.cama = n.cama ' +
            'AND u_n.fechaActualizacion = n.fechaActualizacion ' +
            'AND u_n.emailCreado = n.emailCreado';


        pool.query(sqlQuery, [req.params.emailUser, parseInt(req.params.planta), parseInt(req.params.habitacion)], function (err, result, fields) {
            if (err)
                throw err;
            // Comprobamos si el resultado está vacio o no
            if (Object.keys(result).length === 0) {
                res.status(404).send('Recurso no encontrado')
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * Método GET para obtener las notas de un usuario dados unos parámetros
 */
router.get('/:emailUser/buscar/:planta', async function (req, res) {
    try {
        var sqlQuery
        // Creamos la consulta en función de los parámetros recibidos

        sqlQuery = 'SELECT n.planta, n.habitacion, n.cama, n.fechaActualizacion, n.observaciones1, n.observaciones2, ' +
            'n.ct_frecuenciaCardiaca, n.ct_frecuenciaRespiratoria, n.ct_temperatura, n.ct_presionArterial, n.emailCreado ' +
            'FROM Nota n, UsuarioNotaCrossRef u_n ' +
            'WHERE u_n.email = ? ' +
            'AND u_n.planta = n.planta ' +
            'AND u_n.planta = ? ' +
            'AND u_n.habitacion = n.habitacion ' +
            'AND u_n.cama = n.cama ' +
            'AND u_n.fechaActualizacion = n.fechaActualizacion ' +
            'AND u_n.emailCreado = n.emailCreado';


        pool.query(sqlQuery, [req.params.emailUser, parseInt(req.params.planta),parseInt(req.params.planta)], function (err, result, fields) {
            if (err)
                throw err;
            // Comprobamos si el resultado está vacio o no
            if (Object.keys(result).length === 0) {
                res.status(404).send('Recurso no encontrado')
            } else {
                res.status(200).json(result);
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * Método POST para insertar una nueva relación
 */
router.post('/add', async function (req, res) {
    try {
        // Extraemos los datos de la nota
        const { emailUser, planta, habitacion, cama, fechaActualizacion, emailUserCreado } = req.body;

        // Realizamos la consulta
        const sqlQuery = 'INSERT INTO UsuarioNotaCrossRef (email, planta, habitacion, cama, fechaActualizacion, emailCreado) VALUES (?,?,?,?,?,?)';
        pool.query(sqlQuery, [emailUser, planta, habitacion, cama, fechaActualizacion, emailUserCreado], function (err, result) {
            if (err) {
                res.status(400).send(err.message);
            } else {
                res.status(200).json(result);
            }
        });
    } catch (err) {
        res.status(400).send(err.message);
    }
})

/**
 * Método DELETE para eliminar una relación en la base de datos
 */
router.delete('/eliminar', async function (req, res) {
    try {
        // Obtenemos el body
        const { emailUser, planta, habitacion, cama, fechaActualizacion, emailUserCreado } = req.body;

        // Realizamos la consulta
        const sqlQuery = 'DELETE FROM UsuarioNotaCrossRef WHERE email = ? AND planta = ? AND habitacion = ? AND cama = ? AND fechaActualizacion = ? AND emailCreado = ?';
        pool.query(sqlQuery, [emailUser, planta, habitacion, cama, fechaActualizacion, emailUserCreado], function (err, result) {
            if (err) {
                throw err;
            }
            if (result.affectedRows > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).send(`No hay ningúna relación con esos datos`)
            }
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * Método PUT para obtener los usuarios compartidos
 */
 router.put('/usuariosCompartidos', async function(req,res){
    try {
         // Extraemos los datos de la nota
         const {planta, habitacion, cama, fechaActualizacion, emailCreado} = req.body;

        // Realizamos la consulta
            const sqlQuery = 
            'SELECT u_n.email ' +
            'FROM Nota n ' +
            'JOIN UsuarioNotaCrossRef u_n ON u_n.planta = n.planta ' +
            'AND u_n.habitacion = n.habitacion ' +
            'AND u_n.cama = n.cama ' +
            'AND u_n.fechaActualizacion = n.fechaActualizacion ' +
            'AND u_n.emailCreado = n.emailCreado ' +
            'WHERE n.planta = ? ' +
            'AND u_n.habitacion = ? '+ 
            'AND u_n.cama = ? ' +
            'AND u_n.fechaActualizacion = ? ' +
            'AND u_n.emailCreado = ? ';
            
        pool.query(sqlQuery, [planta, habitacion, cama, fechaActualizacion, emailCreado], function (err, result) {
            if (err){
                throw err;
            }
            if (Object.keys(result).length === 0) {
                res.status(404).send('La nota no está compartida por nadie')
            } else {
                res.status(200).json(result);
            }
          });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router; // Exportamos el router para poder utilizar las rutas definidas en la clase server