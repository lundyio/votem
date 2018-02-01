const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
var rimraf = require('rimraf');

/**
 * Get Specific Content
 */
router.get('/get', function(req, res){

});

/**
 * Send Email
 */
router.post('/lookup', function(req, res, status){

    var codes = JSON.parse(fs.readFileSync('./data/codes.json', 'utf8'));

    console.log()

    if(codes[req.body.code]){
        res.send(codes[req.body.code]);
    } else {
        res.status(404).send('Code Not Found');
    }

});

module.exports = router;