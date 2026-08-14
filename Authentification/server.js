require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB()
    .then (() => {
        app.listen(3000, () => {
            console.log("Server is running on 3000");
        });   
    }) 
    .catch((error) => {
        console.log("Database connection is failed", error);
    })
