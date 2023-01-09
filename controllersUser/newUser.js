const { getConnection } = require('../db/db');
const { generateError } = require("../helpers3");
const { newUserSchema } = require("../validators/userValidators");
const bcrypt= require("bcrypt");


const newUser = async (req, res, next) =>{
let connection;

  try {

    connection = await getConnection();

    await newUserSchema.validateAsync(req.body);

    const { email, password, name, surname } = req.body;

    // comprobar que no existe un usuario con ese mismo email en la base de datos
    const [existingUser] = await connection.query(`
      SELECT id 
      FROM user
      WHERE email=?`,
      [email]
      );
      
  
     if (existingUser.length > 0) {
      throw generateError(
        "Ya existe un usuario en la base de datos con ese email",
        409
      );
      }
    // meter el nuevo usuario en la base de datos sin activar

    // cifrar la password antes de meterla en la bbdd
    const cryptPassword = await bcrypt.hash(password, 10);


    // meter el nuevo usuario en la base de datos sin activar
    const [dbUser] = await connection.query(
      `
      INSERT INTO user(registrationDate, email, password, name, surname)
      VALUES(UTC_TIMESTAMP,"${email}", "${cryptPassword}", "${name}", "${surname}"
      )
    `,
      [email, cryptPassword, name, surname]
    );
   
      const user_id = dbUser.insertId;

        const [catResult] = await connection.query(
      
      `INSERT INTO category
       (title, user_id) VALUES 
      ( 'viajes', "${user_id}"),
      ('compras', "${user_id}"),
      ( 'evento', "${user_id}"),
      ('recordatorios', "${user_id}")`,
      [user_id]
      );
      if (catResult.length === 0) {
        throw generateError(
          "Error al crear las categorías iniciales",
          409
        );
      }

    res.send({
      status: "ok",
      message:
        "Usuario registrado.",
    });
  }catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}       
      
      
   


module.exports = newUser;
