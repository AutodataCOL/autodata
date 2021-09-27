const inventoryModel = require('../models/inventory.js')

const getInventory = async(req, res) => {
    const { userToken } = req

    const inv = await inventoryModel.findOne({ username: userToken })

    if(!inv) {
        return res.json({ message: 'Todavia no tienes un inventario' })
    }

    return res.json({ inv })
}

const postInventory = async(req, res) => {
    const { reference, name, price, cost, units } = req.body

    if(!reference || !name || !price || !cost || !units) {
        return res.json({ message: 'Debes llenar todos los campos' })
    }

    const inventory = await inventoryModel.findOne({ username: req.userToken })

    if(inventory) {
        const refExists = inventory.products.find(ref => ref.reference === reference)

        if(refExists) {
            return res.json({ message: 'Ya existe un inventario con esa referencia' })
        }

        let product = {
            reference,
            name,
            price,
            cost,
            units
        }

        inventory.products.push(product)

        await inventoryModel.findOneAndUpdate({ username: req.userToken }, {
            products: inventory.products
        }, { useFindAndModify: false })

        return res.json({ success: 'Producto agregado' })
    } else {
        await inventoryModel.create({
            username: req.userToken,
            products: [
                {
                    reference,
                    name,
                    price,
                    cost,
                    units
                }
            ]
        })

        return res.json({ success: 'Inventario creado' })
    }
}

const deleteProduct = async(req, res) => {
    const { reference } = req.params
    const userID = req.userToken

    const inventory = await inventoryModel.findOne({ username: userID })

    if(!inventory) {
        return res.json({ message: 'El inventario no existe' })
    }

    const products = inventory.products.filter(item => item.reference !== reference)

    await inventoryModel.updateOne({ username: userID}, { products })

    return res.json({ message: 'Producto eliminado' })
}

module.exports = {
    getInventory,
    postInventory,
    deleteProduct
}