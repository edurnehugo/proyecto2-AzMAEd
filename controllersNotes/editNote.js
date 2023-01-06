const { getConnection } = require('../db');
const { formatDateToDB, generateError } = require("../helpers");

const { editEntrySchema } = require("../../validators/diaryValidators"); exec } = require ("child_process");

async function editEntry(req, res, next) {
  let connection;

  try {
    connection = await getConnection();

    await editEntrySchema.validateAsync(req.body);

    // Sacamos los datos
    const { date, description, place } = req.body;
    const { id } = req.params;

    // Seleccionar datos actuales de la entrada
    const [current] = await connection.query(
      `
    SELECT id, date, description, place, user_id
    FROM notes
    WHERE id=?
  `,
      [id]
    );

    const [currentEntry] = current;

    if (currentEntry.user_id !== req.auth.id && req.auth.role !== "admin") {
      throw generateError("No tienes permisos para editar esta entrada", 403);
    }

    // Ejecutar la query de edición de la entrada
    await connection.query(
      `
      UPDATE diary SET date=?, place=?, description=?, lastUpdate=UTC_TIMESTAMP
      WHERE id=?
    `,
      [formatDateToDB(date), place, description, id]
    );

    // Devolver resultados
    res.send({
      status: "ok",
      data: {
        id,
        date,
        place,
        description,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
}
TODO:
/* async function editNote(req, res, next) {
  showDebug(req, res, next);
  let {
    id: noteId,
    title: noteTitle,
    content: noteContent,
    visibility: noteVisibility,
    isPublished: noteIsPublished,
    isDeleted: noteIsDeleted,
  } = req.body;

  try {
    const connection = await getConnection();

    const query = connection.prepare(
      'update notes set title = :title, content = :content, visibility = :visibility, isPublished = :isPublished, isDeleted = :isDeleted where id = :id'
    );

    const values = {
      title: noteTitle,
      content: noteContent,
      visibility: noteVisibility,
      isPublished: noteIsPublished,
      isDeleted: noteIsDeleted,
      id: noteId,
    };

    await query.run(values);
    res.sendStatus(200);

    connection.close();
  } catch (error) {
    console.log(error);
    next(error);
  }
} */
/* 
TODO: 
async function updateNote(req, res, next) {
  const connection = await getConnection();
  try {
    const { body } = req;
    await connection.query(
      'UPDATE notes SET title =?, content =? WHERE id =?',
      [body.title, body.content, body.id]
    );
    res.status(200).json({ message: 'Note updated successfully' });
  } catch (error) {
    showDebug(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  connection.release();
} */

module.exports = {
  editNote,
};
