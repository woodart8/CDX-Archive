const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
    photoUrl : String,
})

const Photo = mongoose.model('Photo', photoSchema)
module.exports = Photo;