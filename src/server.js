const path = require('path');
const express = require('express'); // Módulo para crear una conexión
const dotenv = require('dotenv');
// Requerimos los módulos necesarios para crear la página
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
dotenv.config({path: '.env-local'});

const PORT = process.env.PORT || '3001';

const app = express();

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());

// Vistas que utilizaremos en la aplicación
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Carpeta publica de la aplicación que contiene los estilos CSS y las imágenes
app.use(express.static(path.join(__dirname, "public")));

// Rutas accesibles de nuestra API REST
app.get('/', (request, response) => {
    response.render('index'); 
})

const userRouter = require('./routes/user');
const notasRouter = require('./routes/note')
const userNoteRouter = require('./routes/user_note')
const clienteWebRouter = require('./routes/clienteWeb')

app.use('/user',userRouter);
app.use('/note',notasRouter);
app.use('/userNote',userNoteRouter)
app.use('/notas',clienteWebRouter)

// Servidor escuchando
app.listen(PORT, () => {
    console.log(`Aplicación escuchando en el puerto: ${PORT}`)
})