require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
//const fileUpload = require('express-fileupload');

const app = express();

// Notes controllers
//const noteExists = require('./controllersNotes/noteExists');
const listNote = require('./controllersNotes/listNotes');
const getNote = require('./controllersNotes/getNote');
const createNote = require('./controllersNotes/createNote');
const editNote = require('./controllersNotes/editNote');
const deleteNote = require('./controllersNotes/deleteNote');
//const deleteAllNotes = require('./controllersNotes/deleteAllNotes');
//const publicNote = require('./controllersNotes/publicNote');

// Category controllers

//const getCategory = require('./controllersCategory/getCategory');
//const editCategory = require('./controllersCategory/editCategory');
//const newCategory = require('./controllersCategory/newCategory');
//const categoryExists = require('./controllersCategory/categoryExists');
//const deleteCategory = require('./controllersCategory/deleteCategory');

// Imagenes
//const uploadNoteImage = require('./controllersImages/uploadNoteImage');
//extra-no pedido ////////////
//const deleteNoteImage = require('./controllersImages/deleteNoteImage');

// User controllers
const newUser = require('./controllersUser/newUser');
const loginUser = require('./controllersUser/loginUser');
const isUser = require('./controllersUser/isUser');
// admin controllers
//const isAdmin = require('./controllersAdmin/isAdmin');

// Middlewares iniciales

app.use(cors());

// Log de peticiones a la consola
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Procesado de body tipo json
app.use(express.json());

// Procesado de body tipo form-data
//app.use(fileUpload());

/*
  ENDPOINTS DE NOTAS
*/

// Listar todas las notas del usuario - solo titulos
// GET - /notes
// Privado
app.get('/notes', isUser, listNote);

// Mostrar una sola nota
// GET - /notes/:id
// Privado
app.get('/notes/:id', isUser, getNote);

// Mostrar una sola nota
// GET - /notes/:id
//********  Pública ????? *********
app.get('/notes/:id', isUser, getNote);

// Crear una nueva Nota
// POST - /notes
// Sólo usuarios registrados
app.post('/notes', isUser, createNote);

// Editar una nota * put o pach * (Sólo los datos que no sean images)
// PUT - /notes/:id
// Sólo usuario que creó esta nota
app.put('/notes/:id', isUser, editNote);

// extra
// Añadir una imagen a una nota
// POST /notes/:id/images
// Solo usuario que crear esta nota
/* app.post('/notes/:id/images', isUser, noteExists, uploadNoteImage); */

////extra - no pedido????//////////////
// Borrar una imagen de una nota
// DELETE /notes/:id/images/:imageID
// Solo usuario que creo esa nota
//app.delete('/notes/:id/images/:imageID', isUser, noteExists, deleteNoteImage);

// extra
// Borrar una nota
// DELETE - /notes/:id
// Sólo usuario que creó esta nota
app.delete('/notes/:id', isUser, deleteNote);

// extra
// Borrar todas las notas
// DELETE - /notes/:id
// Sólo usuario que creó estas notas
//app.delete('/notes/:id', noteExists, deleteAllNotes);

// extra - marca una nota como pública
// POST - /note/:id/public
// Sólo usuarios registrados  put???
//app.patch('/note/:id/public', isUser, noteExists, publicNote);

/*
  ENDPOINTS DE CATEGORIAS  *** extra ***
*/

// EXTRA CREAR - EDITA - BORRAR CATEGORIAS
// extra - Crear una nueva categoria
// get - /category
// Sólo usuarios registrados
//app.get('/category', isUser, getCategory);

// extra - Crear una nueva categoria
// POST - /category
// Sólo usuarios registrados
//app.post('/category', isUser, newCategory);

// extra - Editar categorias
// PUT - /notes/:id
// Sólo usuario que creó esta nota "o admin"
//app.put('/category/:id', isUser, categoryExists, editCategory);

// extra
// Borrar una categoría
// DELETE - /category/:id
// Sólo usuario
//app.delete('/category/:id', isUser, categoryExists, deleteCategory);

/*
  ENDPOINTS DE USUARIO
*/

// Registro de usuarios
// POST - /users
// Público
app.post('/users', newUser);

// Login de usuarios
// POST - /users/login
// Público
app.post('/users/login', loginUser);

// Middlewares finales

// Error middleware
app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});

// Not found
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found',
  });
});

const port = 8888;

app.listen(port, () => {
  console.log(`API funcionando en http://localhost:${port} `);
});
