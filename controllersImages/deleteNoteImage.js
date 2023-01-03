const { getConnection } = require('../db/db');
const { generateError, deleteUpload } = require('./../helpers2');

async function deleteNoteImage(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id, imageID } = req.params;

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

    if (currentEntry.user_id !== req.auth.id && req.auth.role !== 'user') {
      throw generateError('No tienes permisos para editar esta nota', 403);
    }

    // Seleccionar la imagen
    const [image] = await connection.query(
      `
      SELECT nameFile
      FROM images
      WHERE id=? AND Notes_id=?
    `,
      [imageID, id]
    );

    if (image.length === 0) {
      throw generateError('La imagen no existe', 404);
    }

    // Borrar la imagen que coincida de la db y del disco
    await connection.query(
      `
      DELETE FROM images
      WHERE id=? AND Notes_id=?
    `,
      [imageID, id]
    );

    await deleteUpload(image[0].image);

    res.send({
      status: 'ok',
      message: 'Imagen borrada',
    });
  } catch (error) {
    console.log(`Error:`, error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = deleteNoteImage;
