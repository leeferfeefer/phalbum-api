const express = require('express');
const router = express.Router();
const DBService = require('../service/DB.service');

router.post('/upload', function(req, res) {
    if (req?.body?.images?.length > 0) {
        try {
            const images = req.body.images;        
            DBService.saveImages(images);
            res.status(200).send("Success!");
        } catch (err) {
            res.status(500).send('DB Error!');
        }
    } else {
        res.status(400).send('Invalid request body!');
    }
});


module.exports = router;