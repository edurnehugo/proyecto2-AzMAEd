const { getConnection } = require('../db/db');
const { processAndSaveImage, generateError } = require('./../helpers2');

async function uploadEntryImage(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;

    // Comprobar que el usuario puede actualizas las imagenes de la entrda
    // Seleccionar la entrada del diario con la id
    const [current] = await connection.query(
      `
        SELECT user_id
        FROM notes
        WHERE id=?
      `,
      [id]
    );

    // Comprobar que el usuario puede editar esta entrada
    const [currentEntry] = current;

    if (currentEntry.user_id !== req.auth.id && req.auth.role !== 'admin') {
      throw generateError('No tienes permisos para editar esta nota', 403);
    }

    // Comprobar que la entrada tenga solo 1 imagen asociada
    const [images] = await connection.query(
      `
      SELECT id
      FROM images
      WHERE notes_id=?
    `,
      [id]
    );

    if (images.length === 1) {
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
        throw generateError(
          'No se pudo procesar la imagen. Inténtalo de nuevo',
          400
        );
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

module.exports = uploadEntryImage;
