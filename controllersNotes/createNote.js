const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

async function createNote(req, res, next) {
  const connection = await getConnection();
  try {
    const { title, text, place } = req.body;
    const row = await connection.query(
      'INSERT INTO notes (title, text, place) VALUES (?,?,?)',
      [title, text, place]
    );
    res.json(row);
  } catch (error) {
    showDebug(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  connection.release();
}

module.exports = {
  createNote,
};
