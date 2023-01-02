const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');
const crypto = require('crypto');
const crypto = require('crypto');

const sendgrid = require('@sendgrid/mail');

const { format } = require('date-fns');

function generateError(message, code = 500) {
  const error = new Error(message);
  error.httpStatus = code;
  return error;
}

function showDebug(message) {
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
  }
}

module.exports = {
  generateError,
  showDebug,
};
