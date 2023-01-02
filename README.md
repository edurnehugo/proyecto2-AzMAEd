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
  - private (true o false) deafult true
  - date_created

- Category :

  - id
  - tittle (default unique)
  - User_id foreign key
  - Notes_id foreign key

- Imagen :
  - Id
  - nameFile
  - Notes_id foreign key
  - uploadDate

## Endpoints

- **POST /user** Registro de usuario ✅
- **POST /login** Login de usuario (devuelve token) ✅

- **POST /** Permite crear un tweet (necesita cabecera con token) ✅
- **GET /** Lista todos los tweets ✅
- **GET /tweet/:id** Deveuelve un tweet ✅
- **DELETE /tweet/:id** Borra un tweet sólo si eres quien lo creó ✅

- **GET /user/:id** Devuelve información de usuario ✅
