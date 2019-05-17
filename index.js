require('dotenv').config()
const server = require('./api/server')
const PORT = process.env.PORT || 8008

server.listen(PORT, () => {
  console.log(`\n*** Don't tell me what to do on http://localhost:${PORT} ***\n`)
})