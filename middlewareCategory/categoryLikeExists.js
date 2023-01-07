const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');
const { categorySchema } = require('../validators/categoryValidators');

const categoryLikeExists = async (req, res, next) => {
  console.log('categoria existe?');
  let connection;
  try {
    connection = await getConnection();

    await categorySchema.validateAsync(req.body);

    const { title } = req.body;

    const user_id = req.auth.id;
    console.log(req.auth.id);

    // Comprobar que la categoria existe en la base de datos
    const [result] = await connection.query(
      `
    SELECT id
    FROM category
    WHERE  title = ?  AND user_id = ?
  `,
      [title, user_id]
    );

    if (result.length > 0) {
      console.log('la categoria que quieres añadir ya existe');
      throw generateError(
        `La categoria title ${result[0].title} ya existe en la base de datos`,
        404
      );
    }

    if (result[0].user_id !== req.auth.id) {
      throw generateError('No tienes permisos para editar esa categoría', 403);
    }

    console.log('la categoria existe');

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = categoryLikeExists;
