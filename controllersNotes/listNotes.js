const { getConnection } = require('../db/db');
const { showDebug, generateError } = require('../helpers');

const listNote = async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;
    const user_id = id;
    const results = await connection.query(
      `SELECT title 
      FROM notes 
      WHERE user_id=?`,
      [user_id]
    );
    console.log(results);
    if (results.lenght === 0) {
      throw generateError(`El usuario ${user_id} no tiene notas.`);
    }
    showDebug(results);
    res.send({
      status: 'ok',
      data: results[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  listNote,
};
