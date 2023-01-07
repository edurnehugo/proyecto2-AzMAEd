const { getConnection } = require('../db/db');
const { showDebug, generateError } = require('../helpers');

const deleteNote = async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection();
    const { user_id } = req.body;
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
      `
DELETE FROM notes
WHERE user_id=?
`,
      [user_id]
    );
    res.send({
      status: 'ok',
      message: `La nota con id: ${user_id} fue borrada`,
    });
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  deleteNote,
};
