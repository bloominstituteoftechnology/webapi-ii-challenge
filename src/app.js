const { server,port } = require('./server.js');

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${port}`);
});