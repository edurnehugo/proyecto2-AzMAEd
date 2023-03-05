const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');
const { categorySchema } = require('../validators/categoryValidators');

const editCategory = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    await categorySchema.validateAsync(req.body);

    // Sacamos los datos
    const { category } = req.body;
    const { id } = req.params;

    //Seleccionar datos actuales de la categoria
    const [result] = await connection.query(
      `
    SELECT *
    FROM categories
    WHERE id=?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`La categoria no existe`, 404);
    }

    if (result[0].user_id !== req.auth.id) {
      throw generateError('No tienes permisos para editar esta categoría', 403);
    }

    // Ejecutar la query de edición de la categoria
    await connection.query(
      `
      UPDATE categories SET category=?
      WHERE id=?
    `,
      [category, id]
    );

    // Devolver resultados
    res.send({
      status: 'ok',
      message: 'Categoría editada',
      data: {
        id,
        category,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editCategory;
