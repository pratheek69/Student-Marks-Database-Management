import mysql2 from "mysql2"


export const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"test69",
    database:"SDM"
})

// module.exports = db;
