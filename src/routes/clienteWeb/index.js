const express = require('express'); // Módulo para crear una conexión
const auth = require("./auth.routes");
//const index = require("./index.routes");
//const links = require("./links.routes");
//const user = require("./user.routes");

const router = express();

//router.use(index);
router.use(auth);
//router.use(user);
//router.use("/links", links);

module.exports = {router};
