const server = require ('./server')

const PORT = process.env.PORT || 4000
server.listen(PORT , () =>{
    console.log( ' we in here on port 4000 ')
})