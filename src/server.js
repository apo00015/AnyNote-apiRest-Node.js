const express = require('express'); // Módulo para crear una conexión
const dotenv = require('dotenv');
// Requerimos los módulos necesarios para crear la página
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');

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
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));
/**
 * Rutas de nuestra API REST
 */
app.get('/', (request, response) => {
    //response.render('index');
    response.status(200).send("Pagina inicial")
})

const userRouter = require('./routes/user');
const notasRouter = require('./routes/note')
const userNoteRouter = require('./routes/user_note')

app.use('/user',userRouter);
app.use('/note',notasRouter);
app.use('/userNote',userNoteRouter)

/**Servidor escuchando */
app.listen(PORT, () => {
    console.log(`Listening for requests on port ${PORT}`)
})

