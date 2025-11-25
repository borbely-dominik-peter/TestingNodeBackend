require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//const mongoString = "mongodb+srv://jankojulianna_db_user:n0PBwr3KvCeJNzWW@cluster0.gpzrj36.mongodb.net/battleships";
const mongoString = "mongodb://localhost:27017/battleships";
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