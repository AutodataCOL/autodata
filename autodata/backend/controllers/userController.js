const userModel = require('../models/user.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginUser = async(req, res) => {
    const { username, password } = req.body

    if(!username || !password) {
        return res.json({ message: 'Debe completar todos los campos' })
    }

    const user = await userModel.findOne({ username })

    if(!user) {
        return res.status(400).json({ message: 'El nombre de usuario no existe' })
    }

    const correctPassword = await bcrypt.compare(password, user.password)

    if(!correctPassword) {
        return res.status(403).json({ message: 'Contraseña incorrecta' })
    }

    jwt.sign({ id: username }, process.env.JWT_TOKEN, (err, token) => {
        if(err) {
            return res.status(400).json({ message: 'No se pudo generar el token' })
        }

        console.log(token)
        return res.status(201).json({ token })
    })
}

const authenticate = async(req, res) => {
    const { userToken } = req

    const user = await userModel.findOne({ username: userToken })

    if(!user) {
        return res.status(400).json({ message: 'No se encontro ningun usuario' })
    }

    const userInfo = {
        id: user._id,
        username: user.username
    }

    return res.status(200).json({ userInfo })
}

const updatePassword = async(req, res) => {
    const { password, new_password } = req.body

    const user = await userModel.findOne({ username: req.userToken })

    const isValid = await bcrypt.compare(password, user.password)

    if(isValid) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(new_password, salt, async(err, hash) => {
                let new_password = hash

                await userModel.findOneAndUpdate({ username: req.userToken }, {
                    password: new_password
                }, { useFindAndModify: false })
            })
        })

        res.json('Contraseña correcta')
    } else {
        res.json('Incorrecta')
    }
}

module.exports = {
    loginUser,
    authenticate,
    updatePassword
}