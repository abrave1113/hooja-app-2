const mongoose = require('mongoose')
const path = require('path')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

userSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd )
}

const model = mongoose.model('User', userSchema)

module.exports = model