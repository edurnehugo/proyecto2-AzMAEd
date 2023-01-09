const { getConnection } = require('../db/db');
const { showDebug } = require('../helpers');

const getNote = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;
    const user_id = req.auth.id;
    const [result] = await connection.query(
      `SELECT title, text, place, c.category, i.nameFile FROM notes n LEFT OUTER JOIN categories c on n.category_id = c.id LEFT OUTER JOIN images i on n.id = i.notes_id  WHERE n.user_id = ? AND n.id= ?;
      `,
      [user_id, id]
    );
    res.send(result);
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getNote;
