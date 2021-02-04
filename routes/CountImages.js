const express = require('express');
const router = express.Router();
const DBService = require('../service/DB.service');

router.get('/count', function(req, res) {
    DBService.getImageCount((count) => {  
        if (!!count || count === 0) {
            res.send(count);                        
        } else {
            res.status(500).end();
        }         
    });    
});

module.exports = router;