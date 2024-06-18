const app = require('./app')
const port = 3000
const prisma = require('../prisma/index')

if(prisma){
    console.log('connected to database')
    app.listen(port, () => {
        console.log(`listening to port ${port}`)
    })
}
