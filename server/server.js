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
// function savePreferences(user_id, cuisines) {
//     ` 
//         Save all user's preferred meals to the database and fetch them from the API
//         user_id - integer that uniquely identifies the user
//         cuisine - array of cuisines the user prefers to see
//     `
//     // Save each listed cuisine to preferences table
//     cuisines.forEach((cuisine) => {
//         console.log(`Current cuisine: ${cuisine}`);
//         const insert_cuisine = `INSERT INTO preferences(user_id, cuisine) VALUES(?,?)`;

//         db.query(insert_cuisine, [user_id, cuisine,], (err) => {
//             if (err) return console.log(`There was an error saving your preferred cuisine`);
//         });
//     })
// }

// ===========================================================
// QUERIES
// ===========================================================
// app.post("/post-preferences", (req, res) => {
//     ` Save user preferences to database`
//     // get all user info
//     const name = req.body.name;
//     const budget = req.body.budget;
//     const cuisines = req.body.cuisine;

//     // check if given data has already been cached
//     console.log(`POSTED DATA: Name - ${name}, Budget - $${budget}, Cuisines - ${cuisines}`);

//     // check that the name hasn't already been taken
//     const hasName = `SELECT * FROM users WHERE name=?`;

//     db.query(hasName, [name,], (err, result) => {
//         if (err) {
//             console.log(" === ERROR LOCATING USER === ");
//             return res.json({"status": 500, "message": "Error locating provided user"});
//         }

//         if (result[0].name == name) { res.json({"status": 500, "message": "Error: Username already taken"}); }
//         else {
//             const insert_user = `INSERT INTO users(name, budget) VALUES(?,?)`;
//             db.query(insert_user, [name, budget,], (err, result) => {
//                 if (err) {
//                     console.log(" === ERROR CREATING NEW USER === ");
//                     res.json({"status": 500, "message": "Error creating a new user, please try again"});
//                 }
//                 else { savePreferences(result[0].id, cuisines); }
//             })
//         }
//     });

// });

// ===========================================================
// API REQUESTS
// ===========================================================
// Sanitize data from API request
function parseResponse(meal) {
    `  
        Extract necessary data from API request and save as an object
        where each key specifies the type of data being saved. Key values include:
        name - name of the meal, instructions - meal recipe, ingredients - meal
        ingredients, serving_size - meal serving size, ...

        The values are the actual values pulled from the API respone. When parsing the
        data, the keys come directly from the Tasty API documentation
    `
    try {
        console.log(`Current meal: ${meal}`);
        let newMeal = new Object();

        newMeal["name"] = meal["name"];
        newMeal["instructions"] = meal["instructions"];
        newMeal["ingredients"] = meal["sections"][0]["components"];

        newMeal["serving_size"] = meal["num_servings"];
        newMeal["cook_time"] = meal["total_time_minutes"];

        newMeal["mealPrice"] = meal["price"]["total"];
        newMeal["mealImage"] = meal["thumbnail_url"];
        newMeal["mealAltText"] = meal["thumbnail_alt_text"];

        // Add results to newMeal object where key is the name of the results key and value is the variable
        console.log(`Parsed data: ${JSON.stringify(newMeal)}`);

        // Cache parsed data
        cache.set(cuisine, newMeal);
    } catch {
        console.error("There was an error parsing the data");
    }
}

// Fetch data for a specific cuisine and parse response data
async function getCuisines(cuisine) {
    try {
        const response = await fetch(`${process.env.MEALS_ENDPOINT}?from=0&size=7&tags=${cuisine}`,
            {
                headers: {
                    "x-rapidapi-host": "tasty.p.rapidapi.com",
                    "x-rapidapi-key" : process.env.API_AUTH_KEY
                }
            }
        );
        const data = await response.json();
        console.log(`API fetch result: ${data}`);

        // Sanitize each response returned from API call and save to cache
        let meals = data["results"].forEach((meal) => parseData(meal));

        return meals;
    } 
    catch {
        console.error(`New Error`);
    }
};

// Fetch meal data for each preferred cuisine
app.get("/get-cuisines", (req, res) => {
    try {
        // Get list of cuisines from user
        const cuisines = req.body.cuisines;
        console.log(`User Cuisines: ${cuisines}`);

        // For each cuisine, make API call to endpoint if cuisine data not already saved
        cuisines.forEach((cuisine) => {
            // Check if the current cuisine has already been cached before making a new API call
            const hasCuisine = cache.get(cuisine);
            console.log(`Cached cuisine from hasCuisine: ${hasCuisine}`);

            if (hasCuisine === undefined) {
                let newCuisine = getCuisines(cuisine);

                res.json({
                            "status": 200, 
                            "message": `Successfully fetched new cuisine ${cuisine}`,
                            "body": newCuisine
                        });
            }
            else { 
                res.json({
                            "status": 200, 
                            "message": `Successfully fetched cached cuisine ${cuisine}`,
                            "body": hasCuisine
                        });
            }
        });
    } catch (error) {
        res.json({
                    "status": 500, 
                    "message": `Failed to fetch cuisines: ${error}`,
                    "body": hasCuisine
                });
    }
    
});

app.listen(8081, () => {
    console.log("=== WEB SERVER STARTED ===");
});