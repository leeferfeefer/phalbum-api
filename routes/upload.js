
const express = require('express');
const router = express.Router();
const DBService = require('../service/DB.service');

router.post('/upload', function(req, res) {
    if (req?.body?.images?.length > 0) {
        // Save images here - Do I do one image at a time or all at once?
        res.send("success!")
    } else {
        res.status(400).send('Invalid request body!');
    }
});

router.post('/createDB', function(req, res) {
    dbService.createDB();
    dbService.addPhotoFilePaths(['somehwere', 'hither', 'there']);
    res.status(200).end();
});

module.exports = router;