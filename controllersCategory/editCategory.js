const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');

const { editCategorySchema } = require('../validators/categoryValidators');

const editCategory = async (req, res, next) => {
  let connection;

  console.log('editar categoria');

  try {
    connection = await getConnection();

    await editCategorySchema.validateAsync(req.body);

    // Sacamos los datos
    const { title } = req.body;
    const { id } = req.params;

    //Seleccionar datos actuales de la categoria
    const [result] = await connection.query(
      `
    SELECT *
    FROM category
    WHERE id=?
    `,
      [id]
    );

    if (result.length === 0) {
      console.log('la categoria que quiero editar no existe');
      throw generateError(
        `La categoria title ${result[0].title} no existe en la base de datos`,
        404
      );
    }

    if (result[0].user_id !== req.auth.id) {
      throw generateError('No tienes permisos para editar esta categoría', 403);
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
      message: 'Categoría editada',
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
};

module.exports = editCategory;
