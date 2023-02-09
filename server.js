require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const port = 8888;

// Notes controllers
const listNote = require('./controllersNotes/listNotes');
const getNote = require('./controllersNotes/getNote');
const getNotePublic = require('./controllersNotes/getNotePublic');
const createNote = require('./controllersNotes/createNote');
const editNote = require('./controllersNotes/editNote');
const deleteNote = require('./controllersNotes/deleteNote');
const publicNote = require('./controllersNotes/publicNote');

// Category controllers
const newCategory = require('./controllersCategory/newCategory');
const getCategory = require('./controllersCategory/getCategory');
const editCategory = require('./controllersCategory/editCategory');
const deleteCategory = require('./controllersCategory/deleteCategory');

// Imagenes
const uploadNoteImage = require('./controllersImages/uploadNoteImage');
const deleteNoteImage = require('./controllersImages/deleteNoteImage');

// User controllers
const newUser = require('./controllersUser/newUser');
const loginUser = require('./controllersUser/loginUser');

// Admin controllers
const isAdmin = require('./controllersAdmin/isAdmin');

const isUser = require('./middleware/isUser');


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

// Editar una nota
// PUT - /notes/:id
// Sólo usuario que creó esta nota
app.put('/notes/:id', isUser, editNote);

// extra - marca una nota como pública
// POST - /note/public/:id
// Sólo usuarios registrados
app.put('/notes/public/:id', isUser, publicNote);

// extra
// Borrar una nota
// DELETE - /notes/:id
// Sólo usuario que creó esta nota
app.delete('/notes/:id', isUser, deleteNote);

// extra
// Añadir una imagen a una nota
// POST /images/notes/:id
// Solo usuario que crear esta nota
app.post('/images/notes/:id', isUser, uploadNoteImage);

// extra
// Añadir una imagen a una nota
// POST /images/notes/:id
// Solo usuario que crear esta nota
app.delete('/images/notes/:id', isUser, deleteNoteImage);

/*
  ENDPOINTS DE CATEGORIAS  
*/

// extra - listar categorias
// get - /category
// Sólo usuarios registrados
app.get('/category', isUser, getCategory);

// extra - Crear una nueva categoria
// POST - /category
// Sólo usuarios registrados
app.post('/category', isUser, newCategory);

// extra - Editar categorias
// PUT - /notes/:id
// Sólo usuario que creó esta nota
app.put('/category/:id', isUser, editCategory);

// extra - Borrar una categoría
// DELETE - /category/:id
// Sólo usuario
app.delete('/category/:id', isUser, deleteCategory);

/*
  ENDPOINTS DE USUARIO
*/

// Registro de usuarios
// POST - /users
app.post('/users', newUser);

// Login de usuarios
// POST - /users/login
app.post('/users/login', loginUser);

//Editar datos del usuario: email, name, apellidos
//PUT -/user/:id
//Sólo el usuario o el Admin
app.put("/user/:id", isUser, isAdmin, editUser);

//Borrar un usuario
//DELETE- /user/:id
//Sólo el Admin
app.delete("/user/:id", isUser, isAdmin, deleteUser);

//Editar password de usuario
//POST- /user/:id/password
//Sólo el usuario
app.post("/user/:id/password", isUser, editUserPassword);
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

app.listen(port, () => {
  console.log(`API funcionando en http://localhost:${port} `);
});
