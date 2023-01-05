const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');

const { editCategorySchema } = require('../validators/categoryValidators');

async function editCategory(req, res, next) {
  let connection;
  console.log('editar categoria');
  try {
    connection = await getConnection();

    await editCategorySchema.validateAsync(req.body);

    // Sacamos los datos
    const { title, id } = req.body;

    // Seleccionar datos actuales de la categoria
    const [result] = await connection.query(
      `
    SELECT user_id
    FROM category
    WHERE title=? AND id=?
    `,
      [title, id]
    );

    if (result.user_id !== req.auth.id) {
      throw generateError('No tienes permisos para editar esta nota', 403);
    }
    // Ejecutar la query de edición de la categoria
    await connection.query(
      `
      UPDATE category SET title=?
      WHERE id=?
    `,
      [title, id]
    );

    // Devolver resultados
    res.send({
      status: 'ok',
      data: {
        id,
        title,
      },
    });
  } catch (error) {
    console.log('Error en editar categoria:', error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editCategory;
