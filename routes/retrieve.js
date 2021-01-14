const express = require('express');
const router = express.Router();
const DBService = require('../service/DB.service');

router.get('/images', function(req, res) {
    //TODO: Add request validation here:
    const index = req.query.index;
    const chunkSize = req.query.chunkSize;
    console.log("index", index);
    console.log("chunkSize", chunkSize);
    try {
        const response = {
            images: [],
            total: 0
        };
        DBService.getImages(index, chunkSize, (rows) => {
            if (rows) {
                response.images = rows;                
            }    
        });  
        DBService.getImageCount((count) => {
            if (count) {
                response.total = count;
            }
        })  
        res.json(response);
    } catch (err) {
        res.status(500).send('DB Error!');
    }
});


module.exports = router;