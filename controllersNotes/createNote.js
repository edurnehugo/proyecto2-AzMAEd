const { getConnection } = require('../db/db');
const { showDebug } = require('../helpers');
const { newEntrySchema } = require('../validators/notesValidators');

const createNote = async (req, res, next) => {
  let connection;
  console.log('createNote, crea una nueva nota');
  try {
    connection = await getConnection();
    await newEntrySchema.validateAsync(req.body);
    const { title, text, place, category_id } = req.body;
    const { id } = req.auth;
    const user_id = id;

    //Ejecutar la query
    const [row] = await connection.query(
      'INSERT INTO notes (title, text, place, user_id, category_id, dateCreate) VALUES (?,?,?,?,?, UTC_TIMESTAMP)',

      [title, text, place, user_id, category_id]
    );
    res.send({
      status: 'ok',
      message: `La nota fue introducida correctamente`,
      data: {
        id: row.insertId,
        title,
        user_id,
      },
    });
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = createNote;
