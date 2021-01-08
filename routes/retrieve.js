const express = require('express');
const router = express.Router();
const DBService = require('../service/DB.service');

router.get('/images', function(req, res) {
    try {
        DBService.getImages((rows) => {
            if (rows) {
                res.json(rows);
            } else {
                res.status(500).send('Error!');
            }           
        });        
    } catch (err) {
        res.status(500).send('DB Error!');
    }
});


module.exports = router;