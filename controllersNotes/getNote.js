const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

async function getNote(req, res, next) {
  const { note } = req.body;
  showDebug('getNote', { note });

  try {
    const connection = await getConnection();
    const result = await connection.query('SELECT * FROM notes WHERE note=?', [
      note,
    ]);
    showDebug('getNote', { result });
    res.status(200).json(result[0]);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = getNote;
