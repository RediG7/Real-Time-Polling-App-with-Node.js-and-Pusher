const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// DB Config
require('./config/db');

const app = express();;

const poll = require('./routes/poll');

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Enable CORS
app.use(cors());
// anything requested in /poll will be reflected in poll file
app.use('/poll', poll);

const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));