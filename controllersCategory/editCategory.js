const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');

const { categorySchema } = require('../validators/categoryValidators');

async function editCategory(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await categorySchema.validateAsync(req.body);

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

    if (currentCategory.user_id !== req.auth.id) {
      throw generateError('No tienes permisos para editar esta nota', 403);
    }

    // Ejecutar la query de edición de la entrada
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
