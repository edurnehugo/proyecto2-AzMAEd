const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

async function deleteAllNotes(req, res, next) {
  try {
    const { connection } = await getConnection();

    await connection.query('DELETE FROM notes');
    res.status(200).send();
    showDebug('Delete All Notes');
  } catch (err) {
    console.error(err);
    next(err);
  } finally {
    connection.end();
  }
}

module.exports = { deleteAllNotes };
