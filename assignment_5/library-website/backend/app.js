// package imports
const express = require('express');
const app = express();
const cors = require('cors');
const bookRouter = require('./controllers/books');
const mongoose = require('mongoose');

const {DB_URL} = require('./config');

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

// allow cors
app.use(cors())
// parse json in requests
app.use(express.json())
// parse urlencoded payloads
app.use(express.urlencoded({ extended: true }));
// books route handler
app.use('/books', bookRouter);

module.exports = app
