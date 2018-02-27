const express = require('express');
const bodyParser = require('body-parser'); // this line
//body parser this line 
const server = express(); 

server.get('/api/friends', (req, res) => {
    const friends = [
        { id: 1, name: 'Yasin' },
        { id: 2, name: 'Michael' },
        { id: 3, name: 'Moises' },
];
}

server.post('/api'/friends', function(req, res) {
    console.log(req.body); // << this line 
    fs.appendFile()
    const friend = req.body; // << this line 
        id: 4, 
        name: 'Jared'
    };

    friends.push(friends);
    fs.appendFile('friends.json', JSON.stringify(friends));
    res.status(201).json(friends);
})

server.listen(9000, () => {
    console.log(running on '9000');
});