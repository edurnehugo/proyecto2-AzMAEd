const { getConnection } = require('../db/db');
const { generateError } = require('../helpers');
const { editEntrySchema } = require('../validators/notesValidators');

const editNote = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    await editEntrySchema.validateAsync(req.body);

    // Sacamos los datos
    const { title, text, place, category_id} = req.body;
    const { note_id } = req.params;
    const id= parseInt (note_id);
    const user_id = req.auth.id;

    

    console.log ("prueba",note_id);
    //Seleccionar datos actuales de la categoria

    const [[result]] = await connection.query(
      `
    SELECT id, title, text, place, category_id, user_id
    FROM notes
    WHERE id=?
    `,
      [id]
    );
console.log(result);
    if (result.length === 0) {
     
      throw generateError(`La nota no existe en la base de datos`, 404);

    }
     const [categoryRes] = await connection.query(
      `
    SELECT *
    FROM categories
    WHERE user_id=?
    `,
      [user_id]
    );
      if (categoryRes[0].user_id !== req.auth.id) {
      throw generateError('Esta categoria no te pertenece', 403);
    }

    if (result.user_id !== req.auth.id) {
      throw generateError('No tienes permisos para editar esta nota', 403);
    }

    // Ejecutar la query de edición de la categoria
    await connection.query(
      `
      UPDATE notes SET title=?, text=?, place=?, 
      WHERE id=?
    `,
      [
        title || result.title,
         text || result.text,
          place || result.place,
          category_id,
           id]
    );

    // Devolver resultados
    res.send({
      status: 'ok',
      message: 'Nota editada',
      data: {
        id,
        title,
        text,
        place,
      },
    });
  } catch (error) {
    next('Error en editar nota:', error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = editNote;
