const { Router } = require('express')
const jwt = require('jsonwebtoken')

// Middlewares
const authVerification = require('./middlewares/authVerification.js')

// Controllers
const userController = require('./controllers/userController.js')
const inventoryController = require('./controllers/inventoryController.js')
const adminController = require('./controllers/adminController.js')


// Router
const router = Router()

// User
router.post('/login', userController.loginUser)
router.get('/home', authVerification, userController.authenticate)
router.post('/updatepassword', authVerification, userController.updatePassword)

// Inventory
router.get('/inventory', authVerification, inventoryController.getInventory)
router.post('/inventory', authVerification, inventoryController.postInventory)
router.delete('/inventory/:reference', authVerification, inventoryController.deleteProduct)

// Admin
//router.post('/admin', adminController.createAdmin)
router.post('/register', adminController.createUser)

module.exports = router