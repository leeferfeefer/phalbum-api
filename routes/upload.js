
var express = require('express');
var router = express.Router();

router.post('/upload', function(req, res) {
    if (req?.body?.images?.length > 0) {
        // Save images here - Do I do one image at a time or all at once?
        res.send("success!")
    } else {
        res.status(400).send('Invalid request body!');
    }
});

module.exports = router;