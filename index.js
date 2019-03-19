const server = require('./server');


const port = 4000;
server.listen(port, () => console.log(`server rolling on port ${port}`));