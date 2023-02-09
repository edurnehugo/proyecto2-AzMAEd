const { getConnection } = require('../db/db');
const { generateError } = require('./../helpers2');
const fs = require('fs/promises');
const path = require('path');

async function deleteNoteImage(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;
    const user_id = req.auth.id;

    // Seleccionar la entrada del diario con la id
    const [current] = await connection.query(
      ` SELECT title, text, place, category_id, c.category, i.nameFile, i.id as images_id FROM notes n LEFT JOIN categories c on n.category_id = c.id LEFT JOIN images i on n.id = i.notes_id  WHERE n.user_id = ? AND n.id= ?`,
      [user_id, id]
    );
    console.log(current);

    if (current.length === 0) {
      throw generateError(`Elige una nota que exista`);
    }

    // Comprobar que el usuario puede editar esta entrada
    const nameFileDelete = current[0].nameFile;
    const images_id = current[0].images_id;

    if (nameFileDelete === null) {
      throw generateError('La imagen que quieres eliminar no existe', 404);
    }

    // Borrar la imagen que coincida de la db y del disco
    await connection.query(
      `
      DELETE FROM images
      WHERE id=?
    `,
      [images_id]
    );

    const uploadsDir = path.join(__dirname, '../uploads');

    await fs
      .unlink(path.join(uploadsDir, nameFileDelete))
      .then(() => {
        console.log('imagen borrada');
      })
      .catch((error) => {
        console.error('no se ha podido borrar la imagen del directorio', error);
      });

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
