const express = require('express');
const router = express.Router();
const DBService = require('../service/DB.service');
const ImageProcessorService = require('../service/ImageProcessor.service');

router.post('/process', function(req, res) {
    DBService.getImages(0, -1, (rows) => {        
        ImageProcessorService.processImages(rows);
        res.status(200).end();                        
    });    
});

module.exports = router;