const { getConnection } = require('../db/db');
const { showDebug } = require('../helpers');
const { generateError } = require('../helpers2');

const getNotePublic = async (req, res, next) => {
  let connection;

  try {
    // falta la comprobación de que la nota es pública para poder mostrarla!!!!!

    connection = await getConnection();
    const { id } = req.params;

    const [result] = await connection.query(
      ` SELECT title, text, place, private, c.category, i.nameFile FROM notes n LEFT JOIN categories c on n.category_id = c.id LEFT JOIN images i on n.id = i.notes_id  WHERE n.id= ?;
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`Esta nota no exite`, 404);
    }

    if (result[0].private === 1) {
      throw generateError(`Esta nota no es pública `, 404);
    }

    res.send({
      status: 'ok',
      data: result,
    });
  } catch (error) {
    showDebug(error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getNotePublic;
