const mysql = require('mysql')
const db = mysql.createConnection({
host: "db-mysql",
user: "root",
password: "root",
database:"codingchallenge" 
})

module.exports = db;