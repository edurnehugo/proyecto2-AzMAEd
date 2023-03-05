const fs = require('fs/promises');
const path = require('path');
const { getConnection } = require('../db/db');
const { generateError } = require('../helpers');

const getNoteById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM notes WHERE id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`La nota con id no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const deteleNoteById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM notes WHERE id = ?
    `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const deleteNote = async (req, res, next) => {
  let connection;
  try {
    const { id } = req.params;
    const user_id = req.auth.id;

    connection = await getConnection();

    const [current] = await connection.query(
      ` SELECT title, text, place, category_id, c.category, i.nameFile, i.id as images_id FROM notes n LEFT JOIN categories c on n.category_id = c.id LEFT JOIN images i on n.id = i.notes_id  WHERE n.user_id = ? AND n.id= ?`,
      [user_id, id]
    );

    if (current.length === 0) {
      throw generateError(`Elige una nota que exista`);
    }

    if (current[0].nameFile !== null) {
      const nameFileDelete = current[0].nameFile;
      const images_id = current[0].images_id;

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
          console.error(
            'no se ha podido borrar la imagen del directorio',
            error
          );
        });
    }

    const notes = await getNoteById(id);

    if (req.auth.id !== notes.user_id) {
      throw generateError(`No tienes permisos para borrar esta nota`, 403);
    }

    await deteleNoteById(id);

    // Devolver resultados
    res.send({
      status: 'ok',
      message: `La nota fue borrada`,
    });
  } catch (error) {
    console.log('Error al borrar la nota:', error);
    next(error);
  }
};

module.exports = deleteNote;
