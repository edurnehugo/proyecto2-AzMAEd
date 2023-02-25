const { getConnection } = require('../db/db'); 
const { generateError } = require('../helpers');
const { changeUser } = require('../validators/userValidators');
const bcrypt = require('bcrypt');

async function modifyUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await changeUser.validateAsync(req.body);

    const { id } = req.params;
    const { name, surname, password } = req.body;

    // Comprobar que el id de usuario que queremos cambiar es
    // el mismo que firma la petición
    if (req.auth.id !== parseInt(id)) {
      throw generateError('No tienes permisos para editar este usuario', 403);
    }

    // Comprobar que el usuario existe
    const [[currentUser]] = await connection.query(
      `
      SELECT id, email, name, surname, password
      FROM user
      WHERE id=?
    `,
      [id]
    );
    console.log(currentUser);
    if (!currentUser) {
      throw generateError(`El usuario no existe`, 404);
    }
    let cryptPassword;
    if (password) {
      cryptPassword = await bcrypt.hash(password, 10);
    }

    await connection.query(
      `
        UPDATE user 
        SET name=?, surname=?, password=?
        WHERE id=?
      `,
      [
        name || currentUser.name,
        surname || currentUser.surname,
        cryptPassword || currentUser.password,
        id,
      ]
    );

    // Dar una respuesta
    res.send({
      status: 'ok',
      message: 'Usuario actualizado.',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = modifyUser;

