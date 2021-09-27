const jwt = require('jsonwebtoken')

const authVerification = async(req, res, next) => {
    const header = await req.headers.authorization

    if(!header) {
        return res.status(401).json({ message: 'No autorizado' })
    }

    const token = header.split(' ')[1]

    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: 'No autorizado' })
        }

        req.userToken = decoded.id
        next()
    })
}

module.exports = authVerification