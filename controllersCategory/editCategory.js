const { getConnection } = require('../../db');
const { formatDateToDB, generateError } = require('../../helpers');

const { editCategorySchema } = require('../../validators/categoryValidators');

async function editCategory(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await editCategorySchema.validateAsync(req.body);

    // Sacamos los datos
    const { title } = req.body;
    const { id } = req.params;

    // Seleccionar datos actuales de la entrada
    const [current] = await connection.query(
      `
    SELECT id, title, user_id
    FROM category
    WHERE id=?
  `,
      [id]
    );

    const [currentCategory] = current;

    if (currentCategory.user_id !== req.auth.id && req.auth.role !== 'user') {
      throw generateError('No tienes permisos para editar esta nota', 403);
    }

    // Ejecutar la query de edición de la entrada
    await connection.query(
      `
      UPDATE category SET title=?
      WHERE id=?
    `,
      [formatDateToDB(date), title, id]
    );

    // Devolver resultados
    res.send({
      status: 'ok',
      data: {
        id,
        date,
        place,
        description,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = editCategory;
