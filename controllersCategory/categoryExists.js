const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');

async function categoryExists(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const { user_id, title } = req.body;

    // Comprobar que la categoria que queremos editar exista en la base de datos
    const [current] = await connection.query(
      `
    SELECT id
    FROM category
    WHERE user_id=? and title=? 
  `,
      [user_id, title]
    );

    if (current.length > 0) {
      throw generateError(
        `La categoria con title ${title} ya existe en la base de datos`,
        404
      );
    } else {
      next();
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = categoryExists;
