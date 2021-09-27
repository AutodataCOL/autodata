const { Schema, model } = require('mongoose')

const inventorySchema = new Schema({
    username: { type: String },
    products: [
        {
            reference: { type: String },
            name: { type: String },
            price: { type: Number },
            cost: { type: Number },
            units: { type: Number }
        }
    ]
})

const inventoryModel = model('inventories', inventorySchema)

module.exports = inventoryModel