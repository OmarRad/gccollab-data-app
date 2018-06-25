var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

// Allow launching of Python scripts
var spawn = require('child_process').spawn

var app = express();
//var ROOT = './public';
var PORT = 2112;

// Write all incoming requests to the terminal
app.use("*", (req, res, next) => {
    console.log(req.originalUrl);
    next();
});

// Route for data requests
app.use( bodyParser.json() );
app.post('/getData/:type', (req, res) => {
    var py;
    var dataString = '';
    switch(req.params.type) {
        case 'request':
            console.log('Data request received!');
            py = spawn('python3', ['data_fetch.py'])
            break;
        case 'resample':
            // This should be removed.
            console.log('Resample request received!');
            py = spawn('python3', ['resample_data.py'])
            break;
    }
    
    console.log(JSON.stringify(req.body));
    // Start the python process
    dataString = '';

    // Handle incoming data from Python
    py.stdout.on('data', function(data) {
        console.log('receiving data from python...');
        dataString += data.toString();
    });

    // Handle end of Python data
    py.stdout.on('end', () => {
        // Send the response straight to client
        console.log('response from python: ' + dataString);
        res.send(dataString);
    });

    // Send out the request data to Python
    py.stdin.write(JSON.stringify(req.body));
    // Stop writing and wait for a response
    py.stdin.end();
});

app.use(express.static(path.join(__dirname, 'build')));

// Prod server
app.get('/', (req, res) => {
    //res.type('text/html');
    //res.send(fs.readFileSync('index.html'));
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);

console.log('Server listening on port ' + PORT);
