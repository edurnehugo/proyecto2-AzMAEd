const crypto = require("crypto");

const { format } = require("date-fns");

function formatDateToDB(date) {
  return format(new Date(date), "yyyy-MM-dd HH:mm:ss");
}

function randomString(length = 20) {
  return crypto.randomBytes(length).toString("hex").slice(0, length);
}

async function sendMail({ email, title, content }) {
  // Configurar api key de sendgrid
  let sendgrid
   await sendgrid.setApiKey(process.env.SENDGRID_KEY);

  // Configurar mensaje
  const message = {
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: title,
    text: content,
    html: `
      <div>
        <h1>${title}</h1>
        <p>${content}</p>
      </div>
    `,
  };

  // Enviar mensaje
  await sendgrid.send(message);
}

function generateError(message, status) {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
}

function showDebug(message) {
  if (process.env.NODE_ENV === "development") {
    console.log(message);
  }
}

module.exports = {
  formatDateToDB,
  randomString,
  sendMail,
  generateError,
  showDebug,
};
