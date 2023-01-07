const { getConnection } = require('../db/db');
const {
  processAndSaveImage,
  generateError,
  createPathIfNotExists,
} = require('./../helpers2');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');


async function uploadNoteImage(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    // Comprobar que el usuario puede actualizar la imagen de la entrada
    // Seleccionar la entrada de la nota con la id
    const [result] = await connection.query(
      `
        SELECT *
        FROM notes
        WHERE id=?
      `,
      [id]
    );

    // Comprobar que el usuario puede editar esta entrada

    if (result.user_id !== req.auth.id) {
      throw generateError('No tienes permisos para editar esta nota', 403);
    }

    let imageFileName;

    if (req.files && req.files.image) {
      // Creo el path del directorio uploads
      const uploadsDir = path.join(__dirname, '../uploads');

      // Creo el directorio si no existe
      await createPathIfNotExists(uploadsDir);

      // Procesar la imagen
      const image = sharp(req.files.image.data);
      image.resize(1000);

      // Guardo la imagen con un nombre aleatorio en el directorio uploads
      imageFileName = `${nanoid(24)}.jpg`;

      await image.toFile(path.join(uploadsDir, imageFileName));
    }

    const upload  = await uploadImagen (req.userId, imageFileName) = {
      
    }

    };

    res.send({
      status: 'ok',
      message: `Tweet con id: ${id} creado correctamente`,
    });

    // Comprobar que la entrada ya tiene imagen asociada
    const [images] = await connection.query(
      `
      SELECT id
      FROM images
      WHERE notes_id=?
    `,
      [id]
    );

    if (images.length > 0) {
      throw generateError(
        'No se puede subir imagenes a esta nota, borra la actual primero',
        406
      );
    }

    // Subir la imagen
    if (req.files && req.files.image) {
      // Procesamos e insertamos imagen
      try {
        const processedImage = await processAndSaveImage(req.files.image);
        await connection.query(
          `
          INSERT INTO images (uploadDate, nameFile, notes_id)
          VALUES(UTC_TIMESTAMP, ?, ?)
        `,
          [processedImage, id]
        );
      } catch (error) {
        console.log(`Error:`, error);
        res
          .status(400)
          .send('No se pudo procesar la imagen. Inténtalo de nuevo');
      }
    } else {
      throw generateError('No se subió una imagen', 400);
    }

    res.send({
      status: 'ok',
      message: 'Imagen subida',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = uploadNoteImage;

/* 
const newTweetController = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || text.length > 280) {
      throw generateError(
        'El texto del tweet debe existir y ser menor de 280 caracteres',
        400
      );
    }
    let imageFileName;

    if (req.files && req.files.image) {
      // Creo el path del directorio uploads
      const uploadsDir = path.join(__dirname, '../uploads');

      // Creo el directorio si no existe
      await createPathIfNotExists(uploadsDir);

      // Procesar la imagen
      const image = sharp(req.files.image.data);
      image.resize(1000);

      // Guardo la imagen con un nombre aleatorio en el directorio uploads
      imageFileName = `${nanoid(24)}.jpg`;

      await image.toFile(path.join(uploadsDir, imageFileName));
    }

    const id = await createTweet(req.userId, text, imageFileName);

    res.send({
      status: 'ok',
      message: `Tweet con id: ${id} creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
}; */
