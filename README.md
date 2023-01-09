# Notas de texto API

DESCRIPCIÓN

Implementar una API que permita publicar notas privadas de texto y categorizarlas.

Creación de una base de datos en donde se crean las tablas según la necesidad del usuario y la especificación del proyecto.
Esta parte es la base del proyecto, ya que desde aquí los usuarios se dan de alta logeándose a la aplicación y se da forma al funcionamiento de la misma.

Pasos iniciales para su puesta en marcha en un servidor local:

- Iniciar con el código "node db/initDB.js" la base de datos de la API en MySQL Workbench.
- Inciar la API con "node server.js".

En la colección de PostMan se encuentrar todos los endpoints para empezar a trabajar con ella.

A continuación se desarrolla el código necesario en VisualCode para esas bases de datos y se contrasta su funcionamiento usando los programas MySQL y PostMan

NotesForMe

## Entidades

- User:

  - id
  - email
  - password
  - name
  - surname
  - registrationDate

- Notes:

  - id
  - tittle
  - text
  - place
  - category_id
  - user_id
  - private booleano deafult true
  - date_created

- Categories :

  - id
  - category
  - User_id foreign key
  - Notes_id foreign key

- Images :
  - Id
  - nameFile
  - Notes_id
  - uploadDate

## Endpoints

- ENDPOINTS DE NOTAS

  - \*\* APP.GET('/notes', listNotes); LISTAR NOTAS
  - \*\* APP.GET('/notes/:id', isUser, getNote); VISUALIZAR UNA NOTA EN CONCRETO POR USUARIO
  - \*\* APP.GET('/notes/:id', getNote); VISUALIZAR NOTA PUBLICA
  - \*\* APP.POST('/notes', isUser, getCategory, newNote);
  - \*\* APP.PUT('/notes/:id', isUser, noteExists, editNote);
  - \*\* APP.POST('/notes/:id/images', isUser, noteExists, uploadNoteImage);
  - \*\* APP.DELETE('/notes/:id/images/:imageID', isUser, noteExists, deleteNoteImage);
  - \*\* APP.DELETE('/notes/:id', isUser, isAdmin, noteExists, deleteNote);
  - \*\* APP.patch('/note/:id/public', isUser, noteExists, publicNote);

- ENDPOINTS DE CATEGORIAS

  - \*\* APP.GET('/category', isUser, getCategory);
  - \*\* APP.POST('/category', isUser, categoryExists, newCategory);
  - \*\* APP.PUT('/category/:id', isUser, categoryExists, editCategory);
  - \*\* APP.DELETE('/category/:id', isUser, categoryExists, deleteCategory);

- ENDPOINTS DE USUARIO

- \*\* APP.POST('/users', newUser);
- \*\* APP.POST('/users/login', loginUser);

- MIDDELWARE

## Anotaciones a la hora de realizar el proyecto

- Además de los comunes como plantear el funcionamiento, las partes y la unión de las tablas, la mayor complicación fue la conexión de Visual con Postman, sobre todo por la necesidad de revisar el buen funcionamiento del código, ya que sin mi parte, a mis compañeros les resultaba más difícil avanzar en el suyo.
-

- Problemas con Git con repositorio y a la hora de subir por ramas sobre todo el package-lock. Quiza se tenga que gestionar de manera conjunta y no individualmente.

- Al trabajar con windows, la terminal wsl no se comunica con Workbench, se tubo que hacer por el terminal Git Bash.

- En algunas librerias, hemos tenido que coger versiones anteriores los que trabajamos con SO Windows y usar la terminal de Bash.
