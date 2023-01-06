const { getConnection } = require('../db');
//const { exec } = require ("child_process");
const { showDebug } = require('../helpers');

async publicNote(req, res, next) {
     const connection = await getConnection();
     


