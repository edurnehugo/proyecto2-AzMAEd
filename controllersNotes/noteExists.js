const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

function noteExists(note) {
  return new Promise((resolve, reject) => {
    const db = getConnection();
    db.collection('notes')
      .where({
        content: note.content,
      })
      .get()
      .then((response) => {
        console.log(response);
        resolve(response.docs.length > 0);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  noteExists,
};
