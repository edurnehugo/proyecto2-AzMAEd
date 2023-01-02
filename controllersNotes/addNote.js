const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

async function addNote(req, res, next) {
  const { note } = req.body;
  showDebug('addNote', { note });

  try {
    const connection = await getConnection();
    const result = await connection.query(
      'INSERT INTO notes (note) VALUES (?)',
      [note]
    );
    showDebug('addNote', { result });
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = addNote;
