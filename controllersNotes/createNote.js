const { getConnection } = require('../db/db');
const { showDebug, generateError } = require('../helpers2');
const { newEntrySchema } = require('../validators/notesValidators');

const createNote = async (req, res, next) => {
  let connection;
  console.log('createNote, crea una nueva nota');
  try {
    connection = await getConnection();
    await newEntrySchema.validateAsync(req.body);
    const { title, text, place, category_id } = req.body;
    const id = req.auth.id;

    const [category] = await connection.query(
      `SELECT user_id FROM categories where id= ?;
      `,
      [category_id]
    );

    if (category[0].user_id !== id) {
      throw generateError('esta categoría no exite', 400);
    }

    //Ejecutar la query
    const [row] = await connection.query(
      'INSERT INTO notes (title, text, place, user_id, category_id, dateCreate) VALUES (?,?,?,?,?, UTC_TIMESTAMP)',

      [title, text, place, id, category_id]
    );
    res.send({
      status: 'ok',
      message: `La nota fue introducida correctamente`,
      data: {
        id: row.insertId,
        title,
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
