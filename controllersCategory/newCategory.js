const { getConnection } = require('../db/db');
//const { generateError } = require('../helpers2');
const { categorySchema } = require('../validators/categoryValidators');

const newCategory = async (req, res, next) => {
  let connection;
  console.log('newcategory, introduce nueva categoria ');
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
      [title, user_id]
    );

    console.log(result);
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
