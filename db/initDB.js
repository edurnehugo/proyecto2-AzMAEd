<<<<<<< HEAD
require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    // Conseguir conexión a la base de datos
    connection = await getConnection();

    //Crear la BBDD
    await connection.query('CREATE DATABASE if not exists notesforme');
    await connection.query('USE notesforme;');

    // Borrar las tablas si existen

    console.log('Borrando tablas');

    await connection.query('DROP TABLE IF EXISTS images');
    await connection.query('DROP TABLE IF EXISTS notes');
    await connection.query('DROP TABLE IF EXISTS category');
    await connection.query('DROP TABLE IF EXISTS user');

    // Crear las tablas de nuevo
    console.log('Creando tablas');

    await connection.query(`
        CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            registrationDate DATETIME,
            email VARCHAR(100) UNIQUE NOT NULL,
            password varchar (150) NOT NULL,
            name varchar (100), 
            surname varchar (150)
            )
            `);

    await connection.query(`
            CREATE TABLE category (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          title varchar (150),
          user_id INTEGER NOT NULL,
          FOREIGN KEY (user_id) REFERENCES user (id)
          )
          `);

    await connection.query(`
          CREATE TABLE notes (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            dateCreate DATETIME,
            place varchar (100),
            title varchar (150),
            text text(50000),
            private BOOLEAN default true, 
            user_id INTEGER NOT NULL,
            category_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) references user (id),
            FOREIGN KEY (category_id) references category (id)
            )
            `);

    await connection.query(`
                    CREATE TABLE images (
                      id INTEGER PRIMARY KEY AUTO_INCREMENT,
                      nameFile varchar (50),
                      notes_id INTEGER NOT NULL,
                      user_id INTEGER NOT NULL,
                      FOREIGN KEY (notes_id) references notes (id),
                      FOREIGN KEY (user_id) references user (id)
                )
                `);
    //console.log("Creando usuario administrador");

    //await connection.query(
    // `
    //INSERT INTO user(registrationDate, email, password, name, surname)
    //VALUES(UTC_TIMESTAMP, "berto@ber.to", SHA2("${process.env.DEFAULT_ADMIN_PASSWORD}", 512), "Berto Yáñez", true, UTC_TIMESTAMP, UTC_TIMESTAMP)
    //`
    //);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Todo hecho, liberando conexión');
    if (connection) connection.release();
    process.exit();
  }
}

main();
=======
require('dotenv').config();

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    // Conseguir conexión a la base de datos
    connection = await getConnection();

    //Crear la BBDD
    await connection.query('CREATE DATABASE if not exists notesforme');
    await connection.query('USE notesforme');

    // Borrar las tablas si existen

    await connection.query('DROP TABLE IF EXISTS images');
    await connection.query('DROP TABLE IF EXISTS notes');
    await connection.query('DROP TABLE IF EXISTS category');
    await connection.query('DROP TABLE IF EXISTS user');

    // Crear las tablas
    await connection.query(`
      CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        registrationDate DATETIME,
        email VARCHAR(100) UNIQUE NOT NULL,
        password varchar (150) NOT NULL,
        name varchar (100), 
        surname varchar (150)
            )
          `);

    await connection.query(`
       CREATE TABLE category (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        title varchar (150),
        FOREIGN KEY (user_id) references user (id)
              )
            `);

    await connection.query(`
      CREATE TABLE notes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        dateCreate DATETIME,
        place varchar (100),
        title varchar (150),
        text text (50000),
        private BOOLEAN default true, 
        user_id INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) references user (id),
        FOREIGN KEY (category_id) references category (id)
      )
    `);

    await connection.query(`
      CREATE TABLE images (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        nameFile varchar (50),
        notes_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (notes_id) references notes (id),
        FOREIGN KEY (user_id) references user (id)
        )
        `);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('Todo hecho, liberando conexión');
    if (connection) connection.release();
    process.exit();
  }
}

main();
>>>>>>> marc
