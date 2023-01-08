const { getConnection } = require('../db/db');
const { generateError } = require('../helpers');

const { editEntrySchema } = require('../validators/notesValidators');

const editNote = async (req, res, next) => {
  let connection;

  console.log('editar notas');

  try {
    connection = await getConnection();

    await editEntrySchema.validateAsync(req.body);

    // Sacamos los datos
    const { title, text, category_id } = req.body;
    const { id } = req.params;
    const user_id = req.auth.id;
    console.log(user_id);
    //Seleccionar datos actuales de la categoria
    const [result] = await connection.query(
      `
    SELECT *
    FROM notes
    WHERE id=?
    `,
      [id]
    );

    if (result.length === 0) {
      console.log('la nota que quiero editar no existe');
      throw generateError(
        `La nota title ${result[0].title} no existe en la base de datos`,
        404
      );
    }
    const [categoryRes] = await connection.query(
      `
    SELECT *
    FROM category
    WHERE user_id=?
    `,
      [user_id]
    );
    console.log(categoryRes);
    if (categoryRes[0].user_id !== req.auth.id) {
      throw generateError('Esta categoria no te pertenece', 403);
    }
    if (result[0].user_id !== req.auth.id) {
      throw generateError('No tienes permisos para editar esta nota', 403);
    }

    // Ejecutar la query de edición de la categoria
    await connection.query(
      `
      UPDATE notes SET title=?, category_id=?, text=?
      WHERE id=?
    `,
      [title, category_id, text, id]
    );

    // Devolver resultados
    res.send({
      status: 'ok',
      message: 'Nota editada',
      data: {
        id,
        title,
        category_id,
        text,
      },
    });
  } catch (error) {
    console.log('Error en editar nota:', error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editNote;
