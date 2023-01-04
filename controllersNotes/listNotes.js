const { getConnection } = require('../db');
const { showDebug } = require('../helpers');

async function listNotes(req, res, next) {
  const connection = await getConnection();
  try {
    let results = await connection.query('SELECT * FROM notes');
    res.json(results);
  } catch (error) {
    showDebug(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  connection.release();
}

module.exports = {
  listNotes,
};
