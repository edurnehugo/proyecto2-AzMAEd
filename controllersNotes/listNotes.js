const { getConnection } = require('../db/db');
const { showDebug, generateError } = require('../helpers');

const listNotes = async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection();
    const { user_id } = req.body;
    let [results] = await connection.query(
      'SELECT title FROM notes WHERE user_id=?',
      [user_id]
    );

    if (results.lenght === 0) {
      throw generateError(`El usuario ${user_id} no tiene notas.`);
    }
    res.send(results[0]);
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  listNotes,
};
