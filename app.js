//set up expressJS app
const PORT = 8000;
const express = require('express');
const app = express();

let functions = require("./functions"); 

//define how the server will respond to certain calls
app.get('/', (req,res) => {
    res.json("Welcome to my chess API :)");
});

app.get('/isvalidselection/:setup/:location', function(req, res) {
    res.json(functions.isValidSelection(setup,location))
});

app.get('/isvalidmove/:setup/:index/:newlocation/:matchhistory', function(req, res) {

});

app.get('/listvalidmoves/:setup/:index/:matchhistory', function(req, res) {
    //testing the parameters
    let setup = req.params.setup
    let index = req.params.index
    let matchHistory = req.params.matchhistory

    res.json("alma")
});

app.get('/enemynextmove/:setup/:matchhistory/:difficulty', function(req, res) {

});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
