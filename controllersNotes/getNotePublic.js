const { getConnection } = require('../db/db');
const { showDebug } = require('../helpers');

const getNotePublic = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;
    const [result] = await connection.query(
      ` SELECT title, text, place, c.category, i.nameFile FROM notes n LEFT JOIN categories c on n.category_id = c.id LEFT JOIN images i on n.id = i.notes_id  WHERE n.id= ?;
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
