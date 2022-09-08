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

});

app.get('/listvalidmoves/:setup/:index/:matchhistory', function(req, res) {
    //testing the parameters
    let setup = req.params.setup
    let index = req.params.index
    let matchHistory = req.params.matchhistory

    res.send("alma")
});

app.get('/enemynextmove/:setup/:matchhistory/:difficulty', function(req, res) {

});

app.get('/test/:firstname', function(req, res) {
    res.send("Hi " + req.params.firstname)
});

module.exports = app;