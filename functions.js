/*

    The API only works in the case when the player is starting on the white side.

    The API caller will need two arrays to call all of these functions:

    #1 -> the current setup of the chessboard
        all pieces (ally and enemy) should be in this form: {location: {row: 1,col: "a"},pieceType: "rook",isplayerPiece: true,isInGame: true}
            -> isPlayerPiece is true if the chess piece is the player's piece
            -> isInGame is true if the chess piece is still in game, it was not captured
        The user has to put these objects into an array. The order of these pieces doesn't matter.

    #2 -> the match history
        all previous moves should be in algebraic notatin: ["b4,a6,g3..."]
            the playsers' moves alternate in this array, starting with white, then black, then white again etc...
            the API caller doesn't need to change this array, they only have to send it to the API when the player wants to
            make a move and then they receive the modified match history with this last move added.

    The functions consist of 2 parts:
    #1 ->the first part can be called by the player to check if the move they want to call on their chess piece is valid
        useful when highlighting all valid chess moves with a certain piece
    #2 ->the second part can be called by the player to send the API what the user's move was and then request a move from the opponent
*/

//#1 FIRST PART

if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

//returns the initial layout of the chessboard, the sequence of the array elements must remain the same
function chessBoardStartingSetup() {
    let setup = [
        { location: {row: 1, col: "a"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "b"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "c"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "d"}, pieceType: "queen", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "e"}, pieceType: "king", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "f"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: true },

        { location: {row: 2, col: "a"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "b"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "c"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "d"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "e"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "f"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "g"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "h"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },

        { location: {row: 7, col: "a"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "b"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "c"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "d"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "e"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "f"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "g"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "h"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },

        { location: {row: 8, col: "a"}, pieceType: "rook", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "b"}, pieceType: "knight", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "c"}, pieceType: "bishop", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "d"}, pieceType: "queen", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "e"}, pieceType: "king", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "f"}, pieceType: "bishop", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "g"}, pieceType: "knight", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "h"}, pieceType: "rook", isplayerPiece: false, isInGame: true }
    ];
    return setup;
};

//we need a function to determine if the individual pieces sent by the user are valid
function checkPieceValidity(piece) {
    if(piece.location.row < 1 || piece.location.row > 8 || piece.location.row % 1 != 0) {
        throw "The row number of the chess piece must be between 1-8!";
    }

    if(!['a','b','c','d','e','f','g','h'].includes(piece.location.col)){
        throw "The column letter must be between a-h!";
    }

    if(!["pawn","rook","knight","bishop","queen","king"].includes(piece.pieceType)) {
        throw "The chess piece type must be one of the following: pawn/rook/knight/bishop/queen/king!";
    }

    if(typeof piece.isplayerPiece !== "boolean") {
        throw "The playerPiece property must be a boolean value!";
    }

    if(typeof piece.isInGame !== "boolean") {
        throw "The isInGame property must be a boolean value!";
    }
}

//returns a piece from the setup which is on a certain location, undefined if it doesn't exist
function getPieceByLocation(setup,expectedLocation) {
    let result = setup.find(item => item.location.row === expectedLocation.row && item.location.col === expectedLocation.col);
    return result;
}

//checks if two pieces are in the same row {"col": "a", row: 6}
function isInSameRow(location1,location2) {
    return location1.row === location2.row;
}

//checks if two pieces are in the same column {"col": "a", row: 6}
function isInSameCol(location1,location2) {
    return location1.col === location2.col;
}

//checks if two pieces are in the same diagonal line {"col": "a", row: 6}
function isInSameDiag(location1,location2) {
    let rowDiff = Math.abs(location1.row - location2.row);
    let colDiff = Math.abs(location1.col.charCodeAt(0) - location2.col.charCodeAt(0));
    return colDiff === rowDiff;
}

//return if the two pieces from setup have pieces in between them in a row (also works if there is no piece at the locations)
function noPieceBetweenInRow(setup,location1,location2) {

    if(!isInSameRow(location1,location2)) {
        throw "The two locations are not in the same row!";
    }

    for(let i=0;i<setup.length;++i) {
        //check if they are in the same column and the examined piece's row is between the two other location
        if(isInSameRow(location1,setup[i].location) && (
        (location1.col < setup[i].location.col && setup[i].location.col < location2.col) ||
        (location2.col < setup[i].location.col && setup[i].location.col < location1.col)
        )){
            return false;
        }
    }

    return true;
}

//return if the two pieces from setup have pieces in between them in a column (also works if there is no piece at the locations)
function noPieceBetweenInCol(setup,location1,location2) {
    
    if(!isInSameCol(location1,location2)) {
        throw "The two locations are not in the same column!";
    }

    for(let i=0;i<setup.length;++i) {
        //check if they are in the same column and the examined piece's row is between the two other location
        if(isInSameCol(location1,setup[i].location) && (
        (location1.row < setup[i].location.row && setup[i].location.row < location2.row) ||
        (location2.row < setup[i].location.row && setup[i].location.row < location1.row)
        )){
            return false;
        }
    }

    return true;
}

//return if the two pieces from setup have pieces in between them in a diagonal (also works if there is no piece at the locations)
function noPieceBetweenInDiag(setup,location1,location2) {
        
    if(!isInSameDiag(location1,location2)) {
        throw "The two locations are not in the same diagonal!";
    }

    for(let i=0;i<setup.length;++i) {
        //check if they are in the same diagonal and the examined piece's row is between the two others' location
        if(isInSameDiag(location1,setup[i].location) && (
        (location1.row < setup[i].location.row && setup[i].location.row < location2.row) ||
        (location2.row < setup[i].location.row && setup[i].location.row < location1.row)
        )){
            return false;
        }
    }

    return true;
}

//we need a function to determine if a piece at index from the setup was moved yet based on algebraic notation
//we only need this information for pawns, rooks and king
function wasPieceMoved(setup,index,matchHistory = []) {

    if(matchHistory === []) {
        return false;
    }

    let piece = setup[index];
    let initPieceLocation = chessBoardStartingSetup()[index].location;

    if(piece.pieceType === "pawn"){
        return initPieceLocation.row !== piece.location.row || //the piece's location is not the starting location
        initPieceLocation.col !== piece.location.col
    }

    else if(piece.pieceType === "rook") {
        const regex = new RegExp(`R${initPieceLocation.col}${initPieceLocation.row}`);

        for(var i=0;i<matchHistory.length;++i) {
            if(initPieceLocation.row !== piece.location.row || //the piece's location is not the starting location
            initPieceLocation.col !== piece.location.col ||
            regex.test(matchHistory[i])) { //there was an occasion when a rook moved back to the starting location
                return true;
            }
        }
        return false;
    }

    /*
    else if(piece.pieceType === "king") {
        return true;
    }
    */
}

//calculates if the pawn at 'index' is eligible to move 1 tile forward - to 'newLocation' - from the chessboard 'setup' 
function isValidMovePawn1Forward(setup,index) {

    let currentPiece = setup[index];

    if(currentPiece.pieceType !== "pawn") {
        throw "The selected piece must be of type pawn!"
    }

    return (
        setup[index].isplayerPiece && setup[index].pieceType === "pawn" && //it's the player's pawn
        getPieceByLocation(setup,{"row":setup[index].location.row + 1,"col":setup[index].location.col}) === undefined) //there is no piece in front of it 1 row ahead 
    
}

function isValidMovePawn2Forward(setup,index,matchHistory) {
    let piece = setup[index];
    return (
        piece.isplayerPiece && piece.pieceType === "pawn" && //it's the player's pawn
        wasPieceMoved(setup,index,matchHistory) === false && //it wasn't moved yet (first move) 
        getPieceByLocation(setup,{"row":piece.location.row+2,"col":piece.location.col}) === undefined && //there is no piece in front of it 2 rows ahead
        getPieceByLocation(setup,{"row":piece.location.row+1,"col":piece.location.col}) === undefined //there is no piece in front of it 1 row ahead
    )
}

//calculates if the pawn at 'index' is eligible to attack 1 forward diagonally
function isValidAttackPawn(setup,index,newLocation) {

    if(getPieceByLocation(setup,newLocation) === undefined) {
        return false;
    }

    if(setup[index].pieceType !== "pawn") {
        throw "The selected piece must be of type pawn!"
    }

    return (
    setup[index].isplayerPiece && setup[index].pieceType === "pawn" && //it's the player's pawn
    getPieceByLocation(setup,newLocation).isplayerPiece === false && //there is an enemy piece there
    newLocation.row === setup[index].location.row + 1 && //the new location is diagonally 1 forward
    ((newLocation.col.charCodeAt(0) === setup[index].location.col.charCodeAt(0) + 1) || (newLocation.col.charCodeAt(0) === setup[index].location.col.charCodeAt(0) - 1))
    )
}

//calculate if the pawn at 'index' is eligible for an enpassant, previous move looks like this: { location: {row: 1, col: "a"}, index: 7 },
function isValidEnpassant(setup,index,newLocation,matchHistory) {

    let lastMove = matchHistory.last(); //like "b3"
    let currentPiece = setup[index];

    if(currentPiece.pieceType !== "pawn") {
        throw "The selected piece must be of type pawn!"
    }

    if(
    /[a-h]5/.test(lastMove) && //the last move was a pawn in the 5th row
    currentPiece.isplayerPiece && currentPiece.pieceType === "pawn" && //a player's pawn is selected
    currentPiece.location.row === 5 && (currentPiece.location.col.charCodeAt(0) === lastMove[0].charCodeAt(0)+1 || currentPiece.location.col.charCodeAt(0) === lastMove[0].charCodeAt(0)-1) && //the enemy pawn is next to it
    newLocation.row === 6 && ((newLocation.col.charCodeAt(0) === currentPiece.location.col.charCodeAt(0) + 1) || (newLocation.col.charCodeAt(0) === currentPiece.location.col.charCodeAt(0) - 1)) && //the player wants to move their pawn 1 forward diagonally (left or right)
    getPieceByLocation(setup,{"row":6,"col":lastMove[0]}) === undefined //there is no piece there
    ) {
        for(let i=0;i<matchHistory.length;++i) { //iterate through the moves
            if(matchHistory[i] === lastMove[0]+'7'){return false} //it wasn't a 2 forward move that happened in the last move
        }
        return true;
    }
    else {
        return false
    }
}
      
//calculate if the pawn at setup[ind] is eligible to pawn promotion when stepping to newLocation
function isValidPawnPromotion(setup,index,newLocation) {

    let currentPiece = setup[index];

    if(currentPiece.pieceType !== "pawn") {
        throw "The selected piece must be of type pawn!"
    }

    return (
        currentPiece.isplayerPiece && currentPiece.pieceType === "pawn" && //a player's pawn is selected
        newLocation.row === currentPiece.location.row + 1 && newLocation.col === currentPiece.location.col && //the player wants to move their pawn 1 forward
        newLocation.row === 8 && //to the last row
        getPieceByLocation(setup,{"row":newLocation.row,"col":newLocation.col}) === undefined//and there is no enemy piece there
    )
}

//gives back an array of possible piece types for pawn promotion
function getPossiblePromotions(){
    return ["rook","knight","bishop","queen"];
}

//calculate if the rook is eligible to move to a certain place
function isValidAttackMoveRook(setup,index,newLocation) {
    
    let currentPiece = setup[index];
    if(currentPiece.pieceType !== "rook") {
        throw "The selected piece must be of type rook!"
    }

    return (
        (newLocation.col === currentPiece.location.col && newLocation.row !== currentPiece.location.row && noPieceBetweenInCol(setup,currentPiece.location,newLocation) ) ||
        (newLocation.row === currentPiece.location.row && newLocation.col !== currentPiece.location.col && noPieceBetweenInRow(setup,currentPiece.location,newLocation) )
    )
}

function isValidAttackMoveKnight(setup,index,newLocation) {

    let currentPiece = setup[index];
    if(currentPiece.pieceType !== "knight") {
        throw "The selected piece must be of type knight!"
    }

    //2 + 1, one vertically, one horizontally 
    let rowDiff = Math.abs(currentPiece.location.row - newLocation.row)
    let colDiff = Math.abs(currentPiece.location.col.charCodeAt(0) - newLocation.col.charCodeAt(0))

    return (rowDiff+colDiff === 3 && rowDiff < 3 && colDiff < 3) && //moves in an L shape
    //lazy evaluation
    (getPieceByLocation(setup,newLocation) === undefined ||  getPieceByLocation(setup,newLocation).isplayerPiece === false) //there is an enemy piece there or no piece
}

function isValidAttackMoveBishop(setup,index,newLocation) {
    
    let currentPiece = setup[index];
    if(currentPiece.pieceType !== "bishop") {
        throw "The selected piece must be of type bishop!"
    }

    let rowDiff = Math.abs(currentPiece.location.row - newLocation.row)
    let colDiff = Math.abs(currentPiece.location.col.charCodeAt(0) - newLocation.col.charCodeAt(0))

    return rowDiff === colDiff && //moves diagonally
    noPieceBetweenInDiag(setup,currentPiece.location,newLocation) && //no other piece in way
    (getPieceByLocation(setup,newLocation) === undefined ||  getPieceByLocation(setup,newLocation).isplayerPiece === false) //there is an enemy piece there or no piece
}

function isValidAttackMoveQueen(setup,index,newLocation) {

    let currentPiece = setup[index];
    if(currentPiece.pieceType !== "queen") {
        throw "The selected piece must be of type queen!"
    }

    let rowDiff = Math.abs(currentPiece.location.row - newLocation.row)
    let colDiff = Math.abs(currentPiece.location.col.charCodeAt(0) - newLocation.col.charCodeAt(0))

 
        
    return (
        //horizontal and vertical moves
        (newLocation.col === currentPiece.location.col && newLocation.row !== currentPiece.location.row && noPieceBetweenInCol(setup,currentPiece.location,newLocation) ) || 
        (newLocation.row === currentPiece.location.row && newLocation.col !== currentPiece.location.col && noPieceBetweenInRow(setup,currentPiece.location,newLocation) )
    ) 
    ||
        //diagonal moves
    (
        rowDiff === colDiff &&
        noPieceBetweenInDiag(setup,currentPiece.location,newLocation) && 
        (getPieceByLocation(setup,newLocation) === undefined ||  getPieceByLocation(setup,newLocation).isplayerPiece === false) 
    )
    
}



//we specify here that we want to export these functions from the functions.js module
module.exports = {
    chessBoardStartingSetup,
    checkPieceValidity,
    getPieceByLocation,
    isInSameRow,
    isInSameCol,
    isInSameDiag,
    noPieceBetweenInRow,
    noPieceBetweenInCol,
    noPieceBetweenInDiag,
    wasPieceMoved,
    isValidMovePawn1Forward,
    isValidMovePawn2Forward,
    isValidAttackPawn,
    isValidEnpassant,
    isValidPawnPromotion,
    getPossiblePromotions,
    isValidAttackMoveRook,
    isValidAttackMoveKnight,
    isValidAttackMoveBishop,
    isValidAttackMoveQueen
}