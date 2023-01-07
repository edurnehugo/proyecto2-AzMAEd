const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');

const categoryExists = async (req, res, next) => {
  console.log('categoria existe?');
  let connection;
  try {
    connection = await getConnection();
    const { id } = req.params;

    // Comprobar que la categoria existe en la base de datos
    const [result] = await connection.query(
      `
    SELECT title
    FROM category
    WHERE id=? 
  `,
      [id]
    );
    console.log(result);

    if (result.length === 0) {
      console.log('la categoria no existe');
      throw generateError(
        `La categoria title ${result[0].title} no existe en la base de datos`,
        404
      );
    }

    console.log('la categoria existe');

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = categoryExists;
