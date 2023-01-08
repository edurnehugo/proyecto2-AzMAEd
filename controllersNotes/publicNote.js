const { getConnection } = require('../db/db');
const { generateError, editPrivateSchema } = require('../helpers');

const publicNote = async (req, res, next) => {
  let connection;

  console.log('Haciendo publicas las notas');

  try {
    connection = await getConnection();
    const booleanchi = req.body.private;
    console.log(typeof booleanchi);
    //undefined = false;
    const validator = await editPrivateSchema.validateAsync(booleanchi);
    console.log(validator);

    if (!Boolean) {
      console.log('Tiene que ser booleano');
      throw generateError(`Hay que indicar si es publica o privada`, 404);
    }

    // Sacamos los datos
    const { private } = req.body;
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
      console.log('la nota que quiero hacer publica no existe');
      throw generateError(`La nota que quieres hacer publica no existe`, 404);
    }
    if (result[0].user_id !== req.auth.id) {
      throw generateError(
        'No tienes permisos para hacer publica esta nota',
        403
      );
    }
    connection = await getConnection();

    // Ejecutar la query de hacer publica la nota
    const [publico] = await connection.query(
      `
    UPDATE notes SET private=? 
    WHERE id=?
    `,
      [private, id]
    );
    console.log(publico);
    // Devolver resultados
    res.send({
      status: 'ok',
      message: 'Nota hecha publica',
      data: {
        id,
        private,
      },
    });
  } catch (error) {
    console.log('Error en hacer publica la nota:', error);
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = publicNote;
