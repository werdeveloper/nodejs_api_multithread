// const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const { Sequelize } = require('sequelize');
console.log(process.env.DB_DATABASE, process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD);

const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
// const db = new Sequelize('nodejs_api_2023', 'root', '', {    
    host: 'localhost', // process.env.DB_HOST,
    port: 3306, // process.env.DB_PORT,
    dialect: "mysql",
    logging: true, // if you want to show the raw query
    pool: {
        max: 400,
        min: 0,
    },
    timezone: "+05:30"
});

db.authenticate()   // DB connection check
.then(() => {
    console.log('DB Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
})

module.exports = db;