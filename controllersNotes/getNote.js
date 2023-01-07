const { getConnection } = require('../db/db');
const { showDebug } = require('../helpers');

const getNote = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;
    const user_id = req.auth.id;
    const [result] = await connection.query(
      `SELECT * 
      FROM notes 
      WHERE user_id = ? AND id=?
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
