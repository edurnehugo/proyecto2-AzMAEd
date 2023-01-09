const { getConnection } = require('../db/db');
const { showDebug } = require('../helpers');

const getNotePublic = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;
    const [result] = await connection.query(
      `SELECT * 
      FROM notes 
      WHERE id=?
      `,
      [id]
    );
    res.send(result);
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getNotePublic;
