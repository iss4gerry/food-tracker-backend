const prisma = require('../prisma/index')
const app = require('./app')

const port = 4000

if(prisma){
    app.listen(port, () => {
        console.log(`Listening to port ${port}`)
    })
}