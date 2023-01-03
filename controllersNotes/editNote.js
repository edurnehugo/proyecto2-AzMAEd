const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

TODO:
async function editNote(req, res, next) {
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
}

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
}

module.exports = {
  editNote,
};
