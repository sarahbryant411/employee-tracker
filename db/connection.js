const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'classlist_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );

  db.connect (err => {
    if (err) throw err;
    console.log('Database connected.');
  });

  module.exports = db;