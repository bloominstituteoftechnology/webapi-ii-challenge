// is in charge of urls beginning with /api/channels
const router = require('express').Router();

let channels = [
    {
        name: 'node',
    },
    {
        name: 'java',
    },
    {
        name: 'help',
    },
];

// only runs if the url begins with /api/channels
router.get('/', (req, res) => {
    res.status(200).json(channels);
});

// create a channel
router.post('/', (req, res) => {
    const channel = req.body;
    if (channel.name) {
        // all good
        channels.push(channel);
        res.status(201).json(channels);
    } else {
        // bad data
        res.status(400).json({ message: 'please provide a name for the channel' });
    }
});

// /api/channels /:id
router.delete('/:id', (req, res) => {
    res.send('deleting a channel');
});

// export default router;
module.exports = router;
