const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

async function deleteNote(req, res, next) {
  //console.log(req.body);
  showDebug('deleteNote');
  showDebug(req.body);
  const connection = await getConnection();
  const id = req.body.id;
  const query = `DELETE FROM notes WHERE id = ${id};`;
  showDebug(query);
  try {
    await connection.query(query);
    //console.log(id);
    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
}

module.exports = {
  deleteNote,
};
