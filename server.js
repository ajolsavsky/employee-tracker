const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
//TODO: Replace with secure vs
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '',
      database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
);

//TODO - post/get/delete requests


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

  