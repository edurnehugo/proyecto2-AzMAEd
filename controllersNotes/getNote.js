const { getConnection } = require('../db/db');
const { showDebug, generateError } = require('../helpers');

const getNote = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;
    console.log(id);
    const user_id = req.auth.id;
    const [result] = await connection.query(
      `SELECT title, text, place, category_id, private, c.category , i.nameFile, i.id as images_id FROM notes n LEFT JOIN categories c on n.category_id = c.id LEFT JOIN images i on n.id = i.notes_id  WHERE n.user_id = ? AND n.id= ?;
      `,
      [user_id, id]
    );
    console.log("linea 17",result);
    if (result.length === 0) {
      throw generateError('esta nota no exite', 400);
    }
    res.send(result);
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getNote;
