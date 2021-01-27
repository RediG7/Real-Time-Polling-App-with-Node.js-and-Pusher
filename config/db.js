require('dotenv').config()

const mongoose = require('mongoose');

// Mongoose Connect
mongoose.connect('mongodb+srv://redi:' + process.env.MONGODB_PASSWORD + '@testcluster1.hvjuc.mongodb.net/pusherPollDB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));