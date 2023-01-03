const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');
const { categorySchema } = require('../validators/categoryValidators');

async function newCategory(req, res, next) {
  let connection;
  try {
    connection = await getConnection();

    await categorySchema.validateAsync(req.body);

    // Sacar de req.body los datos que necesito
    const { title, user_id } = req.body;

    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO category (title, user_id)
      VALUES(?,?)
      `,
      [title, req.auth.id]
    );

    // Devolver el resultado

    res.send({
      status: 'ok',
      data: {
        id: result.insertId,
        title,
        user_id,
      },
    });
  } catch (error) {
    console.log('Error al introducir la categoria:', error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newCategory;
