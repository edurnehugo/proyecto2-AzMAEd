const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

async function createNote(req, res, next) {
  const connection = await getConnection();
  try {
    const { title, content, tags } = req.body;
    const row = await connection.query(
      'INSERT INTO notes (title, content, tags) VALUES (?,?,?)',
      [title, content, tags]
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
