const fs = require('fs/promises');

// Definimos directorio de subida de imágenes

const { format } = require('date-fns');

// Definimos directorio de subida de imágenes
//const imageUploadPath = path.join(__dirname, '../uploads');

const formatDateToDB = async (date) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
};

async function checkExists(path) {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
}

/* const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    await fs.mkdir(path);
  }
}; */

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
  //processAndSaveImage,
  //deleteUpload,
  checkExists,
  generateError,
  showDebug,
  //createPathIfNotExists,
};
