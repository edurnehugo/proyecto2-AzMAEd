const { getConnection } = require('../db');
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

async function noteExists(req, res, next) {
  try {
    const db = getConnection();
    const content = req.body.content;
    await noteExists(content);
    res.status(200).send({
      result: true,
    });
  } catch (err) {
    showDebug(err);
    res.status(500).send(err);
  }
}

module.exports = {
  noteExists,
};
