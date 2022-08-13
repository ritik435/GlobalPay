const mongoose = require('mongoose');

require('dotenv').config()

mongoose.connect(process.env.URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
// console.log(db);
// console.log('Connected to Database :: MongoDB');

db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;