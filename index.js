const server = require('./server');

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Listening to the part ${PORT}`);
})