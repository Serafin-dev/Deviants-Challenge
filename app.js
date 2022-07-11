// Requires
require('dotenv').config();
const express = require('express'); 
const path = require('path');

// app 
const app = express();
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', async (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, 'index.html'));
});
app.get('/dist/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/bundle.js'));
});

module.exports = app;