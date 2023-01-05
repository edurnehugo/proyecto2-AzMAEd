const { getConnection } = require('../db/db');
const { showDebug, generateError } = require('../helpers2');

const getCategory = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { user_id } = req.body;

    const result = await connection.query(
      `
    SELECT *
    FROM category
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
    //return res.send(result[0]);

    /*    res.send({
      status: 'ok',
      data: { result[0]},
    }); */
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = getCategory;
