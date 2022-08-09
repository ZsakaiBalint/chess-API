//set up expressJS app
const PORT = 8000;
const express = require('express');
const app = express();

//include functions module, the file that contains 
//the core functionality of the project
var functions = require("./functions"); 
//console.log(functions.addTwo(1,2));
//console.log(functions.lolSomething());

//define how the server will respond to certain calls
app.get('/', (req,res) => {
    res.json("Welcome to my chess :)");
});

app.get('/test', (req,res) => {
    res.json("hehe it's working");
});

app.get('/test/:testId', async (req,res) => {
    res.json("testing a parameter");
    console.log(req.params.testId);
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
