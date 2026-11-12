// Import all necessary modules for app 
require('dotenv').config(); 

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

// Create new web server and setup basic server configurations
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors);
app.use(express.json);
const port = 3360;

const pswrd = process.env.PASSWORD;

// Establish connection to SQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: pswrd,
    database: "meal_planner",
    port: port
});

db.connect((err) => {
    if (err) console.log(`=== ERROR: COULDN'T CONNECT TO DATABASE: ${err} ===`);
    else console.log(`=== DATABASE CONNECTION SUCCESSFUL ===`);
})



app.listen(port, () => {
    console.log("=== WEB SERVER STARTED ===")
});