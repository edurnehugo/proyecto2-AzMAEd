const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');
//const deleteCategory = require('./deleteCategory');
//const editCategory = require('./editCategory');
//const newCategory = require('./editCategory');

const categoryExists = async (req, res, next) => {
  console.log('categoria existe?');
  let connection;
  try {
    connection = await getConnection();
    const { user_id, title } = req.body;

    // Comprobar que la categoria existe en la base de datos
    const [current] = await connection.query(
      `
    SELECT id
    FROM category
    WHERE user_id=? and title like ? 
  `,
      [user_id, title]
    );

    if (current.length > 0) {
      console.log('la categoria existe');
      next();
    } else {
      console.log('la categoria no existe');
      throw generateError(
        `La categoria con title ${title} que requiere no existe en la base de datos`,
        404
      );
    }
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = categoryExists;
