const fs = require('fs/promises');
const { format } = require('date-fns');

const formatDateToDB = async (date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
};

async function checkExists(path) {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
}


const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

function showDebug(message) {
  if (process.env.NODE_ENV === 'development') {
    console.log(message);
  }
}

module.exports = {
  formatDateToDB,
  checkExists,
  generateError,
  showDebug,
 
};
