const mongoose = require('mongoose');

require('dotenv').config();

exports.mongoDB = () => {
    mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(() => console.log("MongoDB Connection Failed"));
}