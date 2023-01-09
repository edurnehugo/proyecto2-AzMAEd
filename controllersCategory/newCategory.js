const { getConnection } = require('../db/db');
const { categorySchema } = require('../validators/categoryValidators');

const newCategory = async (req, res, next) => {
  let connection;
  console.log('newcategory, introduce nueva categoria ');
  try {
    connection = await getConnection();

    await categorySchema.validateAsync(req.body);

    // Sacar de req.body los datos que necesito
    const { title } = req.body;
    const { id } = req.auth;

    const user_id = id;
    // Ejecutar la query
    const [result] = await connection.query(
      `
      INSERT INTO category (title, user_id)
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
