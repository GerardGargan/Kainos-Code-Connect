const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '8889',
    database: 'kainos'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Database connection successful')
})

module.exports = db;