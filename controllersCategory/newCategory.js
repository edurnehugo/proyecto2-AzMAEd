const { getConnection } = require('../db/db');
const { categorySchema } = require('../validators/categoryValidators');

const newCategory = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    await categorySchema.validateAsync(req.body);

    // Sacar de req.body los datos que necesito
    const { title } = req.body;
    const user_id = req.auth.id;

    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO categories (category, user_id)
      VALUES(?,?)
      `,
      [title, user_id]
    );

    // Devolver el resultado

    return res.send({
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
};
module.exports = newCategory;
