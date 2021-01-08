const express = require('express');
const router = express.Router();
const DBService = require('../service/DB.service');

router.get('/images', function(req, res) {
    try {
        const images = DBService.getImages();

        // might need to convert to JSON here

        res.status(200).end();
    } catch (err) {
        res.status(500).send('DB Error!');
    }
});


module.exports = router;