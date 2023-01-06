const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const uuid = require('uuid');
const crypto = require('crypto');

const sendgrid = require('@sendgrid/mail');

const { format } = require('date-fns');

function formatDateToDB(date) {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
}

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
  formatDateToDB,
};
