
var express = require('express');
var router = express.Router();

router.post('/upload', function(req, res) {
  res.send('received request to upload');
});

module.exports = router;