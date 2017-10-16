const { server } = require('./server.js');

const PORT = 3000;

server.listen(PORT, (err) => {
  if (err) console.log(`Error: ${err}`);

  console.log(`Server started on port: ${PORT}`);
});
