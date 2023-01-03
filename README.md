# Notas de texto API

DESCRIPCIÓN

Implementar una API que permita publicar notas privadas de texto y categorizarlas.

## Entidades

- User:

  - id
  - email
  - password
  - name
  - surname
  - registration_date
  - role ("admin o user")

- Notes:

  - id
  - user_id foreign key
  - tittle
  - text
  - place
  - category_id??
  - private (true o false) deafult true
  - date_created

- Category :

  - id
  - tittle (default unique)
  - User_id foreign key
  - Notes_id foreign key ??

- Images :
  - Id
  - nameFile
  - Notes_id foreign key
  - uploadDate

## Endpoints

- \*\* ENDPOINTS DE NOTAS

  - \*\* APP.GET('/notes', listNotes); LISTAR NOTAS
  - \*\* APP.GET('/notes/:id', isUser, getNote); VISUALIZAR UNA NOTA EN CONCRETO POR USUARIO
  - \*\* APP.GET('/notes/:id', getNote); VISUALIZAR NOTA PUBLICA
  - \*\* APP.POST('/notes', isUser, getCategory, newNote);
  - \*\* APP.PUT('/notes/:id', isUser, noteExists, editNote);
  - \*\* APP.POST('/notes/:id/images', isUser, noteExists, uploadNoteImage);
  - \*\* APP.DELETE('/notes/:id/images/:imageID', isUser, noteExists, deleteNoteImage);
  - \*\* APP.DELETE('/notes/:id', isUser, isAdmin, noteExists, deleteNote);
  - \*\* APP.patch('/note/:id/public', isUser, noteExists, publicNote);

- \*\* ENDPOINTS DE CATEGORIAS

  - \*\* APP.GET('/category', isUser, getCategory);
  - \*\* APP.POST('/category', isUser, categoryExists, newCategory);
  - \*\* APP.PUT('/category/:id', isUser, categoryExists, editCategory);
  - \*\* APP.DELETE('/category/:id', isUser, categoryExists, deleteCategory);

- \*\* ENDPOINTS DE USUARIO

  - \*\* APP.POST('/users', newUser);
  - \*\* APP.POST('/users/login', loginUser);

## Anotaciones a la hora de realizar el proyecto

- \*\* problemas con Git con repositorio y a la hora de subir por ramas.
- \*\*
