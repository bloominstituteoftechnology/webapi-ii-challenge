const greeter = (req, res) => {
    const person = req.params.person;

    res.json({ hello: person })
};

module.exports = greeter;