const { server } = require('./server.js');

server.listen(3000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('server up and running...');
  }
});
