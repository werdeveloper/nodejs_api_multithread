// const { Client } = require('pg')
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" })

const { Sequelize } = require('sequelize')
const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // if you want to show the raw query
    pool: {
        max: 400,
        min: 0,
    },
    timezone: "+05:30",
});

db.authenticate()   // DB connection check
.then(() => {
    console.log('DB Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

module.exports = db;