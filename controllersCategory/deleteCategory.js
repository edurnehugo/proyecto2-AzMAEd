const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');

const deleteCategory = async (req, res, next) => {
  let connection;
  console.log('deletecategory: borrar categoria ');
  try {
    connection = await getConnection();

    // Sacamos los datos
    const { id } = req.body;

    // Seleccionar datos actuales de la entrada
    const [result] = await connection.query(
      `       
    SELECT id, title, user_id
    FROM category
    WHERE id = ?
    `,
      [id]
    );

    console.log([result]);
    //console.log(req.auth.id);

    /*    if (result[0].user_id !== req.auth.id) {
      throw generateError(
        `No tienes permisos para borrar la categoría de... esta categoria`,
        403
      );
    }
 */
    // Ejecutar la query de edición de la entrada

    await connection.query(
      `
          DELETE FROM category WHERE id = ?

        `,
      [id]
    );

    // Devolver resultados
    res.send({
      status: 'ok',
      message: `La categoría title: ${result[0].title}  fue borrada`,
    });
  } catch (error) {
    console.log('Error al borrar categoria:', error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteCategory;
