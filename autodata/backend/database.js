const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('[+] Conexion exitosa')
})
.catch(err => {
    console.log(`Ocurrio un error: ${err}`)
})