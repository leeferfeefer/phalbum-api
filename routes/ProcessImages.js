const express = require('express');
const router = express.Router();
const DBService = require('../service/DB.service');
const ImageProcessorService = require('../service/ImageProcessor.service');

router.post('/process', function(req, res) {
    DBService.getImagesOneAtATime((row) => {        
        if (row) {
            ImageProcessorService.processImage(row);        
        }        
    });    
    res.status(200).end();                        
});

module.exports = router;