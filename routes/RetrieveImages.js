const express = require('express');
const router = express.Router();
const DBService = require('../service/DB.service');

router.get('/images', function(req, res) {
    //TODO: Add request validation here:
    const index = req.query.index;
    const chunkSize = req.query.chunkSize;
    try {
        const response = {
            images: []
        };
        DBService.getImages(index, chunkSize, (rows) => {        
            response.images = rows;                
            res.json(response);                        
        });                  
    } catch (err) {
        res.status(500).send('DB Error!');
    }
});


module.exports = router;