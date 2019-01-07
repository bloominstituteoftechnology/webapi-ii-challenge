const http = require('http');
const util = require('util');

setInterval(() => {
    util.print('\u001b[2J\u001b[0;0H');
    http.get('http://localhost:5000/api/posts/15', resp => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', chunk => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log('Status code:', resp.status);
            console.log('Header:', JSON.stringify(resp.headers, null, 4));
            data = JSON.parse(data);
            console.log('Data:', JSON.stringify(data, null, 4));
        });
    }).on('error', err => {
        console.log('Error: ' + err.message);
    });
}, 5000);
