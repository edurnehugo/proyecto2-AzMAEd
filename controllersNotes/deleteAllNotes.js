/* const { getConnection } = require('../db/db');
const { showDebug, generateError } = require('../helpers');

const deleteAllNotes = async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection();
    const { user_id } = req.body;
    const { id } = req.auth;
    const user_id = id;
    const [current] = await connection.query(
      `
      SELECT user_id
      FROM notes 
      WHERE user_id=?
      `,
      [user_id]
    );

    if (current[0].user_id !== req.auth.id) {
      throw generateError('No tienes permisos para borrar esta entrada');
    }
    await connection.query(
      `DELETE * 
      FROM notes`
    );
    res.send({
      response: 'Notas borradas',
    });
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
};

module.exports = deleteAllNotes;
 */
