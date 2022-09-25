let functions = require("./functions"); 
const express = require('express');
const app = express();
app.use(express.json())

//DEFINE HOW THE SERVER WILL RESPOND TO CERTAIN HTTP GET CALLS

//GREETING THE USER (DEFAULT RESPONSE)
app.get('/', (req,res) => {
    res.send("Welcome to my chess API :)");
});

//CHECK IF THE USER SELECTED A VALID PLAYER PIECE
app.get('/isvalidselection/:setup/:location', function(req, res) {
    let setup = JSON.parse(req.params.setup)
    let location = JSON.parse(req.params.location)

    res.send( functions.isValidSelection(setup,location) )
});

//CHECK IF THE USER WANTS TO CALL A VALID MOVE
app.get('/isvalidmove/:setup/:index/:newlocation/:matchhistory', function(req, res) {
    let setup = JSON.parse(req.params.setup)
    let index = JSON.parse(req.params.index)
    let newLocation = JSON.parse(req.params.newlocation)
    let matchHistory = JSON.parse(req.params.matchhistory)

    res.send( functions.isValidMove(setup,index,newLocation,matchHistory) )
});

//LIST ALL VALID PLAYER MOVES
app.get('/listvalidmoves/:setup/:index/:matchhistory', function(req, res) {
    let setup = JSON.parse(req.params.setup)
    let index = JSON.parse(req.params.index)
    let matchHistory = JSON.parse(req.params.matchhistory)

    res.send( functions.listValidMoves(setup,index,matchHistory) )
});

//CHECK IF THE GAME IS OVER
app.get('/isgameover/:setup', function(req,res) {
    let setup = JSON.parse(req.params.setup)
    
    res.send( functions.isGameover(setup,matchHistory,difficulty) )
});

//GET THE ENEMY RESPONSE MOVE AFTER THE PLAYER MOVED
app.get('/getenemynextmove/:setup/:matchhistory/:difficulty', function(req, res) {
    let setup = JSON.parse(req.params.setup)
    let matchHistory = JSON.parse(req.params.matchhistory)
    let difficulty = JSON.parse(req.params.difficulty)

    res.send( functions.getEnemyNextMove(setup,matchHistory,difficulty) )
});



module.exports = app;