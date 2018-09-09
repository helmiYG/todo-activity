const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema({
    name: {type: String, required : true},
    email: {type: String, unique: true, required : true},
    password: {type: String, required : true},
    city: {type: String, required : true},
})

let User = mongoose.model('User',userSchema)
module.exports = User