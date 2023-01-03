const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

module.exports = {
    publicNote,
};

TODO:
async function publicNote(params) {
    showDebug('publicNote');

    const { path, tags, userId, db } = params;
