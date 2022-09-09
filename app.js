let functions = require("./functions"); 
const express = require('express');
const app = express();
app.use(express.json())


//define how the server will respond to certain calls
app.get('/', (req,res) => {
    res.send("Welcome to my chess API :)");
});

app.get('/isvalidselection/:setup/:location', function(req, res) {
    let setup = JSON.parse(req.params.setup)
    let location = JSON.parse(req.params.location)

    res.send( functions.isValidSelection(setup,location) )
});

app.get('/isvalidmove/:setup/:index/:newlocation/:matchhistory', function(req, res) {
    let setup = JSON.parse(req.params.setup)
    let index = JSON.parse(req.params.location)
    let newLocation = JSON.parse(req.params.location)
    let matchHistory = JSON.parse(req.params.location)

    res.send( functions.isValidMove(setup,index,newLocation,matchHistory) )
});

app.get('/listvalidmoves/:setup/:index/:matchhistory', function(req, res) {
});

app.get('/enemynextmove/:setup/:matchhistory/:difficulty', function(req, res) {
});



module.exports = app;