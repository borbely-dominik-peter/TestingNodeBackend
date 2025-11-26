require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const mongoString = env("DB_URL");
//const mongoString = "mongodb://localhost:27017/battleships";
const mongoString = "mongodb+srv://MDB:MDB@sandbox.lxgxyuc.mongodb.net/battleships?appName=Sandbox";
mongoose.connect(mongoString);
const database = mongoose.connection;
const routes = require("./routes/routes");
database.on('error', (error) => {
 console.log(error)
})
database.once('connected', () => {
 console.log('Database Connected');
})
const app = express();
app.use(express.json());
app.use("/api",routes)
app.listen(3000, () => {
 console.log(`Server Started at ${3000}`)
})