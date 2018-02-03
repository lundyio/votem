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
 * Search Active Elections
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

/**
 * Create New Election
 */
router.post('/save/election', function(req, res, status){

    var elections = JSON.parse(fs.readFileSync('./data/elections.json', 'utf8'));

    elections.push(req.body);
    fs.writeFile('./data/elections.json', JSON.stringify(elections), 'utf8', function(){
        console.log(elections);
    });

    if(elections.elections){
        res.send('All Good');
    } else {
        res.status(404).send('Code Not Found');
    }

});

module.exports = router;