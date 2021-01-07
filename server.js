const express = require('express');
const logger = require('morgan');
const uploadRoute = require('./routes/upload.js');

const app = express();
const port = 3001;


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', '*');  // enables all the methods to take place
    return next();
});

// dev = :method :url :status :response-time ms - :res[content-length]
app.use(logger('dev'));
app.use(express.json({limit: '500mb'}));
app.use(express.text());
app.use('/api', uploadRoute);

// built-in error handling
// NOTE: must be the last piece of middleware in stack
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Phalbum API listening at http://localhost:${port}`));