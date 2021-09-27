require('dotenv').config()

const express = require('express')
const routes = require('./routes.js')
const path = require('path')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

// Function to initialize the server
const startServer = (cb) => {
    app.listen(port, () => {
        console.log(`[+] Server running on port ${port}`)
        cb()
    })
}

//app.use(express.static(path.join(__dirname, '../frontend')))

startServer(() => {
    require('./database.js')
})