const bcrypt = require('bcryptjs')
const adminModel = require('../models/admin.js')
const userModel = require('../models/user.js')

const createUser = async(req, res) => {
    const { token, username, password } = req.body

    const userExists = await userModel.findOne({ username })

    if(userExists) {
        return res.json({ message: 'Este nombre de usuario ya existe' })
    }

    const admin = await adminModel.findOne({ username: 'autodata-admin' })

    const auth = await bcrypt.compare(token, admin.token)

    if(auth) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async(err, hash) => {
                let newPassword = hash

                await userModel.create({
                    username,
                    password: newPassword
                })

                return res.json({ message: 'Usuario creado' })
            })
        })
    } else {
        return res.json({ message: 'Accion rechazada' })
    }
}

/*const createAdmin = (req, res) => {
    const { username, token } = req.body

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(token, salt, async(err, hash) => {
            let newToken = hash

            const admin = await adminModel.create({
                username,
                token: newToken
            })

            return res.json({ message: 'Administrador creado', admin })
        })
    })
}*/

module.exports = {
    createUser
}