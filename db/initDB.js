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
    await connection.query('DROP TABLE IF EXISTS categories');
    await connection.query('DROP TABLE IF EXISTS user');
    

    // Crear las tablas de nuevo
    console.log('Creando tablas');

    await connection.query(`
        CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            registrationDate DATETIME,
            email VARCHAR(100) UNIQUE NOT NULL,
            password varchar (150) NOT NULL,
            role ENUM ("normal", "admin") DEFAULT "normal" NOT NULL,
            name varchar (100), 
            surname varchar (150)
            )
            `);

    await connection.query(`
            CREATE TABLE categories (
          id INTEGER PRIMARY KEY AUTO_INCREMENT,
          category varchar (150),
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
            FOREIGN KEY (category_id) references categories (id)
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

    await connection.query(
                      `
                      INSERT INTO user (registrationDate, email, password,role, name, surname)
                      VALUES (UTC_TIMESTAMP, "aldaralucas18@hotmail.com", SHA2("${process.env.DEFAULT_ADMIN_PASSWORD}",512), "admin", "Aldara", "Lucas")
                      `
                      );

  } catch (error) {
    console.error(error);
  } finally {
    console.log('Todo hecho, liberando conexión');
    if (connection) connection.release();
    process.exit();
  }
}

main();
