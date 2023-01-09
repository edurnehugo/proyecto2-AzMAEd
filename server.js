require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const fileUpload = require('express-fileupload');
const app = express();
const port = 8080;


// Notes controllers
const listNote = require('./controllersNotes/listNotes');
const getNote = require('./controllersNotes/getNote');
const getNotePublic = require('./controllersNotes/getNotePublic');
const createNote = require('./controllersNotes/createNote');
const editNote = require('./controllersNotes/editNote');
const deleteNote = require('./controllersNotes/deleteNote');
const publicNote = require('./controllersNotes/publicNote');

// Category controllers
const newCategory = require('./controllersCategory/newCategory'); //ok
const getCategory = require('./controllersCategory/getCategory'); //ok
const editCategory = require('./controllersCategory/editCategory'); //ok
const deleteCategory = require('./controllersCategory/deleteCategory'); //ok

// Imagenes
const uploadNoteImage = require('./controllersImages/uploadNoteImage');

// User controllers
const newUser = require('./controllersUser/newUser');
const loginUser = require('./controllersUser/loginUser');
const isUser = require('./controllersUser/isUser');

// Middlewares iniciales

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));

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
// Pública 
app.get('/notes/public/:id', getNotePublic);

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
app.post('/images/notes/:id', isUser, uploadNoteImage);

////extra - no pedido????//////////////
// Borrar una imagen de una nota
// DELETE /notes/:id/images/:imageID
// Solo usuario que creo esa nota
//app.delete('/notes/:id/images/:imageID', deleteNoteImage);

// extra
// Borrar una nota
// DELETE - /notes/:id
// Sólo usuario que creó esta nota
app.delete('/notes/:id', isUser, deleteNote);

// extra - marca una nota como pública
// POST - /note/:id/public
// Sólo usuarios registrados  put???
app.put('/notes/public/:id', isUser, publicNote);

/*
  ENDPOINTS DE CATEGORIAS  *** extra ***
*/

// EXTRA CREAR - EDITA - BORRAR CATEGORIAS
// extra - Crear una nueva categoria
// get - /category
// Sólo usuarios registrados
app.get('/category', isUser, getCategory);

// extra - Crear una nueva categoria
// POST - /category
// Sólo usuarios registrados
app.post('/category', isUser, newCategory);

// extra - Editar categorias
// PUT - /notes/:id
// Sólo usuario que creó esta nota "o admin"
app.put('/category/:id', isUser, editCategory);

// extra
// Borrar una categoría
// DELETE - /category/:id
// Sólo usuario
app.delete('/category/:id', isUser, deleteCategory);

/*
  ENDPOINTS DE USUARIO
*/

// Registro de usuarios
// POST - /users
// Público
app.post('/users', newUser);
app.post('/users', newUser);

// Login de usuarios
// POST - /users/login
// Público
app.post('/users/login', loginUser);
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

//const port = 8888;
//const port = 8888;

app.listen(port, () => {
  console.log(`API funcionando en http://localhost:${port} `);
});
