const { getConnection } = require('../db/db');
const { showDebug, generateError } = require('../helpers2');

const getCategory = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();
    const user_id = req.auth.id;

    const [result] = await connection.query(
      `
    SELECT category, id
    FROM categories
    WHERE user_id=?
    `,
      [user_id]
    );

    if (result.length === 0) {
      throw generateError(`El listado de categorias no existe`, 404);
    }
    showDebug(result);
    res.send({
      status: 'ok',
      data: result,
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getCategory;
