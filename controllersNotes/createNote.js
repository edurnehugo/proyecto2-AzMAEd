const { getConnection } = require('../db/db');
const { showDebug } = require('../helpers');

const createNote = async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection();
    const { title, text, place, user_id, category_id } = req.body;
    const [row] = await connection.query(
      'INSERT INTO notes (title, text, place, user_id, category_id, date) VALUES (?,?,?,?,?, UTC_TIMESTAMP)',

      [title, text, place, user_id, category_id]
    );
    res.send(row[0]);
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createNote,
};
