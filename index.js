const server = require('./server.js')

const port = 4000;

server.listen(port, () => console.log(`App listening on port ${port}!`));
