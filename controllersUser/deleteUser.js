const { getConnection } = require("../db/db");
const { generateError } = require("../helpers");

async function deleteUser(req, res, next) {
  let connection;

  try {
    connection = await getConnection();
    const { id } = req.params;

    // Comprobar que existe esa id y si no dar error 404
    const [current] = await connection.query(
      `
      SELECT user_id
      FROM user
      WHERE id=?

    `,
      [id]
    );

     if (current.legth===0)  {
            throw generateError("El usuario que intentas eliminar no existe")}
    if (req.auth.role !== "admin") {
      throw generateError("No tienes permisos para eliminar este usuario", 403);
    }

       
       await connection.query(
           `
           DELETE FROM images
       WHERE user_id=?
       `,
       [id]
       );
       
       await connection.query(
        `
        DELETE FROM notes
    WHERE user_id=?
    `,
    [id]
    );

       // Borrar las notas asociadas a esa categoría
       await connection.query(
           `
           DELETE FROM categories
           WHERE user_id=?
           `,
           [id]
           );
           
           // Borrar el usuario de la tabla
           await connection.query(
             `
             DELETE FROM user
             WHERE id=?
           `,
             [id]
           );

           res.send({
               status: "ok",
               message: `El usuario ${id} y todos sus datos se han eliminado correctamente`,
            });
        } catch (error) {
            next(error);
        } finally {
            if (connection) connection.release();
        }
    }
    
    module.exports = deleteUser;
    