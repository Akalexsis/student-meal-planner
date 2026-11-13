// Import all necessary modules for app 
require('dotenv').config(); 

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const NodeCache = require("node-cache");

// ===========================================================
// CREATE WEB SERVER AND SETUP SERVER CONFIGURATIONS
// ===========================================================
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
const port = 3306;

const pswrd = process.env.PASSWORD;
const cache = new NodeCache();

// Establish connection to SQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: pswrd,
    database: "meal_planner",
    port: port
});
cache.set("user", ["Test", 300.00, ["American", "Italian", ]]);

// ===========================================================
// CREATE APP DATABASE AND TABLES
// ===========================================================
db.connect((err) => 
    {
        if (err) console.log(`=== ERROR: COULDN'T CONNECT TO DATABASE: ${err} ===`);
        else {
            // Create new database for user to access and store data into
            // const create_database = ` CREATE DATABASE meal_preferences`;

            // db.query(create_database, (err) => {
            //     if (err) console.log(`=== ERROR CREATING DATABASE: ${err}  ===`);
            //     else console.log(`=== DATABASE CONNECTION SUCCESSFUL ===`);
            // });

            console.log(`=== DATABASE CONNECTION SUCCESSFUL ===`);
        };
    }
);

// Create users table to store user information - id, name, and budget
// const create_users = ` CREATE TABLE IF NOT EXISTS users 
//                         (id INT AUTO_INCREMENT PRIMARY KEY, 
//                         name VARCHAR(50), 
//                         budget FLOAT)`;
// db.query(create_users, (err) => {
//     if (err) console.log(`=== ERROR CREATING USERS TABLE ${err} ===`);
//     else console.log(`=== USERS TABLE SUCCESSFULLY CREATED ===`);
// })

// Create preferences table to store user meal preferences. user_id references id in user table
// const create_preferences = ` CREATE TABLE IF NOT EXISTS preferences 
//                             (user_id INT, cuisine varchar(50))`;
// db.query(create_preferences, (err) => {
//     if (err) console.log(`=== ERROR CREATING TABLE: ${err}  ===`);
//     else console.log(`=== PREFERENCES TABLE SUCCESSFULLY CREATED ===`);
// });

// ===========================================================
// CREATE NEW USER AND STORE PREFERENCES
// ===========================================================
// Save all selected user preferences to database
function savePreferences(user_id, cuisines) {
    ` 
        Save all user's preferred meals to the database and fetch them from the API
        user_id - integer that uniquely identifies the user
        cuisine - array of cuisines the user prefers to see
    `
    // Save each listed cuisine to preferences table
    cuisines.forEach((cuisine) => {
        console.log(`Current cuisine: ${cuisine}`);
        const insert_cuisine = `INSERT INTO preferences(user_id, cuisine) VALUES(?,?)`;

        db.query(insert_cuisine, [user_id, cuisine,], (err) => {
            if (err) return console.log(`There was an error saving your preferred cuisine`);
        });
    })
}

// ===========================================================
// QUERIES
// ===========================================================
app.post("/post-preferences", (req, res) => {
    ` Save user preferences to database`
    // get all user info
    const name = req.body.name;
    const budget = req.body.budget;
    const cuisines = req.body.cuisine;

    // check if given data has already been cached
    console.log(`POSTED DATA: Name - ${name}, Budget - $${budget}, Cuisines - ${cuisines}`);

    // check that the name hasn't already been taken
    const hasName = `SELECT * FROM users WHERE name=?`;

    db.query(hasName, [name,], (err, result) => {
        if (err) {
            console.log(" === ERROR LOCATING USER === ");
            return res.json({"status": 500, "message": "Error locating provided user"});
        }

        if (result[0].name == name) { res.json({"status": 500, "message": "Error: Username already taken"}); }
        else {
            const insert_user = `INSERT INTO users(name, budget) VALUES(?,?)`;
            db.query(insert_user, [name, budget,], (err, result) => {
                if (err) {
                    console.log(" === ERROR CREATING NEW USER === ");
                    res.json({"status": 500, "message": "Error creating a new user, please try again"});
                }
                else { savePreferences(result[0].id, cuisines); }
            })
        }
    });

});

app.listen(8081, () => {
    console.log("=== WEB SERVER STARTED ===");
});