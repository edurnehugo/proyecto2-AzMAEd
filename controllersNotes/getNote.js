const { getConnection } = require('../db/db');
const { showDebug } = require('../helpers');

const getNote = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { user_id } = req.params;
    const [result] = await connection.query(
      `SELECT note 
      FROM notes 
      WHERE user_id = ?
      `,
      [user_id]
    );
    res.send(result);
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getNote,
};
