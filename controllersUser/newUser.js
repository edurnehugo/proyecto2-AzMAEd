const { getConnection } = require('../db/db');
const { generateError } = require("../helpers3");
const { newUserSchema } = require("../validators/userValidators");


const newUser = async (req, res, next) =>{
  let connection;
try {

   connection = await getConnection();

    await newUserSchema.validateAsync(req.body);

    const { email, password, name, surname } = req.body;

    // comprobar que no existe un usuario con ese mismo email en la base de datos
    const [existingUser] = await connection.query(
      `
      SELECT id 
      FROM users
      WHERE email=?
    `,
      [email]
    );

    if (existingUser.length > 0) {
      throw generateError(
        "Ya existe un usuario en la base de datos con ese email",
        409
      );
    }

    // meter el nuevo usuario en la base de datos sin activar
    await connection.query(
      `
      INSERT INTO user(registrationDate, email, password, name, surname)
      VALUES(UTC_TIMESTAMP, ?, ?, ?, ?)
    `,
      [email, password, name, surname]
    );

    res.send({
      status: "ok",
      message:
        "Usuario registrado.",
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = newUser;
