const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    firstname: String,
    lastname: String;
    password:{
        type: String,
        required: true,
        unique: true,
    },
    userType: {
        type: String,
        enum: ['normal', 'admin'],
        default: ['normal'],
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Users', usersSchema, 'users')