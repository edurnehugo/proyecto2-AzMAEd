# Notas de texto API - NotesForMe

DESCRIPCIÓN

Implementar una API que permita publicar notas privadas de texto y categorizarlas.

Creación de una base de datos en donde se crean las tablas según la necesidad del usuario y la especificación del proyecto.

Pasos iniciales para su puesta en marcha en un servidor local:

- Iniciar con el código "node db/initDB.js" en el terminal.
- Inciar la API con "node server.js".

En la colección de PostMan se encuentran todos los endpoints para empezar a trabajar con ella.

Cuando se crea un usuario nuevo, automáticamente se crean cuatro categorías estándar.
El usuario puede modificarlas en cualquier instante.

A continuación se desarrolla el código necesario en VisualCode para crear la base de datos, así como el resto de código para su funcionamiento, pudiendo contrastarlo usando los programas MySQL Workbench y PostMan.

*** error encontrado que modificaremos(pero hoy ya no) *** al borrar nota con imagen asociada, da error, debemos cambiar el código para borrar, si tiene imagen asignada, borrar primero la imagen y después borrar la nota.

La estructura del API diseñada, es la siguiente:

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
  - private
  - date_created

- Categories :

  - id
  - category
  - User_id
  - Notes_id

- Images :

  - id
  - nameFile
  - notes_id
  - uploadDate

## Endpoints

- ENDPOINTS DE NOTAS

  - APP.GET('/notes', isUser, listNote); LISTAR NOTAS 👍
  - APP.GET('/notes/:id', isUser, getNote); VISUALIZAR UNA NOTA 👍
  - APP.GET('/notes/public/:id', getNote); VISUALIZAR NOTA PUBLICA 👍
  - APP.POST('/notes', isUser, createNote); CREAR NOTA 👍
  - APP.PUT('/notes/:id', isUser, editNote); 👍
  - APP.PUT('/note/:id/public', isUser, publicNote); HACER UNA NOTA PUBLICA 👍
  - APP.DELETE('/notes/:id', isUser, deleteNote); BORRAR UNA NOTA 👍
  - APP.POST('/notes/:id/images', isUser, uploadNoteImage); SUBIR UNA IMAGEN A UNA NOTA 👍

- ENDPOINTS DE CATEGORIAS

  - APP.GET('/category', isUser, getCategory); LISTAR CATEGORIAS 👍
  - APP.POST('/category', isUser, categoryExists, newCategory); CREAR CATEGORIAS 👍
  - APP.PUT('/category/:id', isUser, categoryExists, editCategory); EDITAR CATEGORIAS 👍
  - APP.DELETE('/category/:id', isUser, categoryExists, deleteCategory); BORRAR CATEGORIAS 👍

- ENDPOINTS DE USUARIO

  - APP.POST('/users', newUser); NUEVO USUARIO 👍
  - APP.POST('/users/login', loginUser); LOGUEAR USUARIO 👍
  
- MIDDELWARE 

  - IS USER

## Anotaciones a la hora de realizar el proyecto

- Además de los comunes como plantear el funcionamiento, las partes y la unión de las tablas, la mayor complicación fue la conexión de Visual con Workbench, sobre todo por la necesidad de revisar el buen funcionamiento del código, ya que sin esta parte no se puede avanzar en el proyecto.

- Problemas con Git por problemas de incompatibiidad entre sistemas operativos, especialmente entre windows y mac.

- Al trabajar con windows, la terminal wsl no se comunica con Workbench, se tubo que hacer por el terminal Git Bash.

- En algunas librerias, hemos tenido que coger versiones anteriores por incompatibilidades de los terminales.

- Es necesario e importante siempre una buena comunicación a la hora de realizar proyectos en conjunto.

