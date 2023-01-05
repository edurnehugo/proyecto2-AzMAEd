const { getConnection } = require('../db/db');
const { generateError } = require('../helpers2');

const deleteCategory = async (req, res, next) => {
  let connection;
  console.log('deletecategory: borrar categoria ');
  try {
    connection = await getConnection();

    // Sacamos los datos
    const { title, user_id } = req.body;

    // Seleccionar datos actuales de la entrada
    const [result] = await connection.query(
      `       
    SELECT id
    FROM category
    WHERE title=? AND user_id=?

    `,
      [title, user_id]
    );

    console.log(result[0].id);

    if (user_id !== req.auth.id) {
      throw generateError(
        `No tienes permisos para borrar la categoría de ${user_id} esta categoria`,
        403
      );
    }

    const { id } = result[0].id;

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
      message: `La categoría con id ${id} title: ${title}  fue borrada`,
    });
  } catch (error) {
    console.log('Error al borrar categoria:', error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

/* res.send({
  status: 'ok',
  
});
 */

module.exports = deleteCategory;
