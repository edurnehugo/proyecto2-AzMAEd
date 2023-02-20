
const { getConnection } = require("../db/db");
const{generateError} = require("../helpers");


async function modifyUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await modifyUser.validateAsync(req.body);

    const { id } = req.params;
    const { email, name, surname } = req.body;

    // Comprobar que el id de usuario que queremos cambiar es
    // el mismo que firma la petición o bien es admin
    if (req.auth.id !== Number(id) && req.auth.role !== "admin") {
      throw generateError("No tienes permisos para editar este usuario", 403);
    }

    // Comprobar que el usuario existe
    const [currentUser] = await connection.query(
      `
      SELECT id, email
      FROM user
      WHERE id=?
    `,
      [id]
    );

    if (currentUser.length === 0) {
      throw generateError(`El usuario no existe`, 404);
    }

    // Si el email es diferente al actual comprobar que no existe en la base de datos
    if (email !== currentUser[0].email) {
      const [existingEmail] = await connection.query(
        `
        SELECT id
        FROM user
        WHERE email=? 
      `,
        [email]
      );

      if (existingEmail.length > 0) {
        throw generateError(
          "Los sentimos, ese email ya existe. Prueba otro por favor...",
          403
        );
        }
      }

      await connection.query(
        `
        UPDATE user 
        SET name=?, surname=?, email=?
        WHERE id=?
      `,
        [name, surname, email, id]
      );

      // Dar una respuesta
      res.send({
        status: "ok",
        message: "Usuario actualizado.",
      });

  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = modifyUser;