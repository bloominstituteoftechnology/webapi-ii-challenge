
const server = require('./server');

const PORT = 6000;

server.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`)
})

