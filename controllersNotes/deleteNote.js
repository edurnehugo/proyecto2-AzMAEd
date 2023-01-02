const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

async function deleteNote(req, res, next) {
  const { note } = req.body;
}

module.exports = deleteNote;
