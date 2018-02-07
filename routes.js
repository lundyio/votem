const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
var rimraf = require('rimraf');

/**
 * Search Active Elections
 */
router.post('/lookup', function(req, res, status){

    //rewrite this to use elections data

    var elections = JSON.parse(fs.readFileSync('./data/elections.json', 'utf8'));

    var match = false

    for (i = 0; i < elections.length; i++) { 
        if( req.body.code && elections[i].code === req.body.code.toLowerCase() ){
            res.status(200).send(elections[i].id);
            match = true;
            break;
        }
    }

    if(!match){
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
    req.body.created = new Date;

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


/**
 * Save Ballot
 */
router.post('/save/ballot', function(req, res, status){

    var elections = JSON.parse(fs.readFileSync('./data/elections.json', 'utf8'));

    for (i = 0; i < elections.length; i++) {
        if( req.body.id && elections[i].id === req.body.id ){
            elections[i].ballot = req.body.ballot;
            fs.writeFile('./data/elections.json', JSON.stringify(elections), 'utf8', function(){
                res.status(200).send('Successfully Added Ballot');
            });
            break;
        }
    }

});

/**
 * Save Vote
 */
router.post('/save/vote', function(req, res, status){

    var votes = JSON.parse(fs.readFileSync('./data/votes.json', 'utf8'));

    votes.push(req.body)

    fs.writeFile('./data/votes.json', JSON.stringify(votes), 'utf8', function(){
        res.status(200).send('Successfully Counted Vote');
    });

});

/**
 * Get Elections
 */
router.get('/get/elections', function(req, res, status){

    var elections = JSON.parse(fs.readFileSync('./data/elections.json', 'utf8'));
    var votes = JSON.parse(fs.readFileSync('./data/votes.json', 'utf8'));

    for (var i=0; i < elections.length; i++){
        elections[i]['ballotsCollected'] = 0;
        for (var n=0; n < votes.length; n++){
            if(elections[i].id === votes[n].electionId){
                elections[i]['ballotsCollected']++
            }
        }
    }

    if(elections){
        res.status(200).send(elections);
    } else {
        res.status(404).send('No Elections Found');
    }

});

/**
 * Get Elections
 */
router.get('/get/election/:id', function(req, res, status){

    var elections = JSON.parse(fs.readFileSync('./data/elections.json', 'utf8'));

    if(elections.length > 0){
        for (i = 0; i < elections.length; i++) {
            if(elections[i].id === req.params.id){
                res.status(200).send(elections[i]);
                break;
            }
        }
    } else {
        res.status(404).send('Election Not Found');
    }

});

/**
 * Get Elections Results By ID
 */
router.get('/get/votes/:id', function(req, res, status){

    var votes = JSON.parse(fs.readFileSync('./data/votes.json', 'utf8'));

    var filtered = [];

    if(votes.length > 0){
        for (i = 0; i < votes.length; i++) {
            if(votes[i].electionId === req.params.id){
                filtered.push(votes[i].votes);
            }
        }
        res.status(200).send(filtered);
    } else {
        res.status(404).send('Election votes Found');
    }

});

module.exports = router;