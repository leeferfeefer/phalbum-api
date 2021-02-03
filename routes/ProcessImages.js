const express = require('express');
const router = express.Router();
const DBService = require('../service/DB.service');
const ImageProcessorService = require('../service/ImageProcessor.service');

router.post('/process', function(req, res) {
    const index = req.query.index;
    const chunkSize = req.query.chunkSize;
    DBService.getImages(index, chunkSize, (rows) => {        
        ImageProcessorService.processImages(rows);
        res.status(200).end();                        
    });    
});

module.exports = router;