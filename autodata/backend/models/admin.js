const { Schema, model } = require('mongoose')

const adminSchema = new Schema({
    username: { type: String, required: true },
    token: { type: String, required: true }
})

const adminModel = model('admin', adminSchema)

module.exports = adminModel