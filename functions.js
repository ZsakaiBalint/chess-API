//function definitions
function addTwo(a,b) {
    return a + b;
}

function lolSomething() {
    return 42;
}

//we specify here that we want to export these functions from the
//functions.js module
module.exports = {
    addTwo,
    lolSomething
}