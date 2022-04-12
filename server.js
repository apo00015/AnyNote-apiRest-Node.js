const express = require('express'); // Módulo para crear una conexión
const dotenv = require('dotenv');

dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || '3001';

const app = express();

//const bodyParser = require('body-parser');

/**
 * Middleware
 */
 //app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(express.urlencoded({extended:false}));

/**
 * Rutas de nuestra API REST
 */
app.get('/', (request, response) => {
    response.status(200).send("Pagina inicial")
})

const userRouter = require('./routes/user');

app.use('/user',userRouter);

/**Servidor escuchando */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})
