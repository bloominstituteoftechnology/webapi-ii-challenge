const greeter = (req, res) => {
    const person = req.params.person;
    res.json({person: person})

}

module.exports = greeter;

/* 
THE ROUTE HANDLER IN INDEX.JS WOULD LOOK LIKE THIS.

server.get('/', greeter);

*/