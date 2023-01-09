const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');

const getCategoryById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM categories WHERE id = ?
    `,
      [id]
    );
    if (result.length === 0) {
      throw generateError(`La categoría con id: ${id} no existe`, 404);
    }
    console.log(result[0]);

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const deteleCategoryById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
      DELETE FROM categories WHERE id = ?
    `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await getCategoryById(id);

    console.log(req.auth.id);
    console.log(category);

    if (req.auth.id !== category.user_id) {
      throw generateError(`No tienes permisos para borrar esta categoria`, 403);
    }

    await deteleCategoryById(id);

    // Devolver resultados
    res.send({
      status: 'ok',
      message: `La categoría con id: ${id} y title: ${category.title} fue borrada`,
    });
  } catch (error) {
    console.log('Error al borrar categoria:', error);
    next(error);
  }
};

module.exports = deleteCategory;
