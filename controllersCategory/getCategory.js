const { getConnection } = require('../db/db');
const { showDebug, generateError } = require('../helpers2');

const getCategory = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { id } = req.auth;
    const user_id = id;

    const result = await connection.query(
      `
    SELECT category
    FROM categories
    WHERE user_id=?
    `,
      [user_id]
    );

    if (result.length === 0) {
      throw generateError(
        `El listado de categorias para el user_id: ${user_id} no existe`,
        404
      );
    }
    showDebug(result);
    res.send({
      status: 'ok',
      data: result[0],
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getCategory;
