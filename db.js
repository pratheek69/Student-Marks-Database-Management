const mysql2 = require("mysql2")


const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"test69",
    database:"SDM"
})

module.exports = db;
