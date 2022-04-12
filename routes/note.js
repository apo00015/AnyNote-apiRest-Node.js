const express = require('express'); // Framework para crear un servidor http
const router = express.Router();    // Módulo para agrupar rutas
const pool = require('../helpers/database');