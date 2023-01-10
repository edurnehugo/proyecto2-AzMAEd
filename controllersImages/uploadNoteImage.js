const { getConnection } = require('../db/db');
const { generateError, checkExists } = require('./../helpers2');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');
const fs = require('fs/promises');

const uploadNoteImage = async (req, res, next) => {
  let connection;
  try {
    connection = await getConnection();

    const { id } = req.params;
    const user_id = req.auth.id;

    // Comprobar que el usuario puede actualizas las imagenes de la entrda
    const [current] = await connection.query(
      `
        SELECT user_id
        FROM notes
        WHERE id=?
      `,
      [id]
    );
    if (current.length === 0) {
      throw generateError('Esta nota no existe', 406);
    }

    // Comprobar que el usuario puede editar esta entrada
    if (current[0].user_id !== req.auth.id) {
      throw generateError('No tienes permisos para editar esta entrada', 403);
    }

    // Comprobar que la entrada tenga una imágen ya asociada
    const [images] = await connection.query(
      `
      SELECT id
      FROM images
      WHERE notes_id=?
    `,
      [id]
    );

    if (images.length > 0) {
      throw generateError('Esta nota ya tiene una imagen asociada', 406);
    }

    let nameFileUp;

    const uploadsDir = path.join(__dirname, '../uploads');

    const exists = await checkExists(uploadsDir);

    if (!exists) {
      await fs.mkdir(uploadsDir);
    }
    // Procesar la imagen
    const image = sharp(req.files.image.data);
    image.resize(1000);

    nameFileUp = `${nanoid(24)}.jpg`;

    await image.toFile(path.join(uploadsDir, nameFileUp));

    await connection.query(
      `
          INSERT INTO images ( nameFile, notes_id, user_id)
          VALUES( ?, ?, ?)
        `,
      [nameFileUp, id, user_id]
    );

    res.send({
      status: 'ok',
      message: 'Imagen subida',
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = uploadNoteImage;
