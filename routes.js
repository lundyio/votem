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

    //rewrite this to use elections data

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

    var dupe = false

    req.body.id = req.body.name.toLowerCase().replace(/ /g, '-');

    for (i = 0; i < elections.length; i++) { 
        if( req.body.code && elections[i].code === req.body.code ){
            res.status(409).send('Election Code');
            dupe = true;
            break;
        } else if(elections[i].id === req.body.id){
            res.status(409).send('Election Name');
            dupe = true;
            break;
        }
    }

    if(!dupe){
        elections.push(req.body);
        fs.writeFile('./data/elections.json', JSON.stringify(elections), 'utf8', function(){
            res.status(200).send('Successfully Added Election');
        });
    }

});

module.exports = router;