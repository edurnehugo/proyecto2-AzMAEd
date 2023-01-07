const { getConnection } = require('../db/db');
const { showDebug, generateError } = require('../helpers');

const noteExists = async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection();
    const { user_id, title } = req.body;
    const [current] = await connection.query(
      ` 
      SELECT id 
      FROM notes 
      WHERE user_id = ? AND title =?
      `,
      [user_id, title]
    );
    if (current.length === 0) {
      throw generateError(`La nota con título ${title} no existe`, 404);
    }
    next();
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = noteExists;
