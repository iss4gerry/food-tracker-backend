const app = require('./app')
const port = 3000
const prisma = require('../prisma/index')
const config = require('./config/config')

if(prisma){
    console.log('connected to database')
    app.listen(config.port, () => {
        console.log(`listening to port ${port}`)
    })
}
