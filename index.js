const server = require("./server.js")
const port = 6666
server.listen(port, () =>{
    console.log("You are running on", port)
})