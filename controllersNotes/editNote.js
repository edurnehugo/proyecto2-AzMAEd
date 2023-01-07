const { getConnection } = require('../db/db');
const { formatDateToDB, generateError } = require('../helpers');

const { editEntrySchema } = require('../validators/notesValidators');

const editNote = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    await editEntrySchema.validateAsync(req.body);

    // Sacamos los datos
    const { title, text, place, category } = req.body;
    const { id } = req.params;

    // Seleccionar datos actuales de la entrada
    const [current] = await connection.query(
      `
    SELECT id, title, text, place, user_id, category_id
    FROM notes
    WHERE id=?
  `,
      [id]
    );

    const [currentEntry] = current;

    if (currentEntry.user_id !== req.auth.id) {
      throw generateError('No tienes permisos para editar esta entrada', 403);
    }

    // Ejecutar la query de edición de la entrada
    await connection.query(
      `
      UPDATE notes SET title=?, place=?, text=?, category=? lastUpdate=UTC_TIMESTAMP
      WHERE id=?
    `,
      [formatDateToDB(title), place, text, category, id]
    );

    // Devolver resultados
    res.send({
      status: 'ok',
      data: {
        id,
        title,
        place,
        text,
        category,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  editNote,
};
