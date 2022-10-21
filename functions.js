const { set } = require("./app");

//API FUNCTIONS

//RETURNS TRUE IF THE SELECTION/RESELECTION IS VALID
function isValidSelection(setup,location) {

    if(!isValidSetup(setup)) {
        throw "The given setup is not valid!"
    }
    if(!isValidLocation(location)) {
        throw "The given location is not valid!"
    }

    let piece = getPieceByLocation(setup,location)
    return piece.isplayerPiece && //a player can only select their pieces
                piece.isInGame    //which are still in game
}

//RETURNS TRUE IF THE PIECE FROM SETUP AT INDEX CAN MOVE TO THE NEWLOCATION BASED ON THE MATCH HISTORY
function isValidMove(setup,index,newLocation,matchHistory){

    if(!isValidSetup(setup)) {
        throw "The given setup is not valid!"
    }
    if(index % 1 !== 0) {
        throw "The index must be an integer number"
    }
    if(!isValidLocation(newLocation)) {
        throw "The given location is not valid!"
    }
    if(!isValidMatchHistory(matchHistory)) {
        throw "The given match history is not valid!"
    }

    let currentPiece = setup[index];

    if(currentPiece.pieceType === "pawn") {
        return (
            isValidMovePawn1Forward(setup,index) ||
            isValidMovePawn2Forward(setup,index,matchHistory) ||
            isValidAttackPawn(setup,index,newLocation) ||
            isValidEnpassant(setup,index,newLocation,matchHistory) ||
            isValidPawnPromotion(setup,index,newLocation)
        )
    }
    else if(currentPiece.pieceType === "rook") {
        return isValidAttackMoveRook(setup,index,newLocation)
    }
    else if(currentPiece.pieceType === "knight") {
        return isValidAttackMoveKnight(setup,index,newLocation)
    }
    else if(currentPiece.pieceType === "bishop") {
        return isValidAttackMoveBishop(setup,index,newLocation)
    }
    else if(currentPiece.pieceType === "queen") {
        return isValidAttackMoveQueen(setup,index,newLocation)
    }
    else if(currentPiece.pieceType === "king") {
        return (
            isValidAttackMoveKing(setup,index,newLocation) ||
            isValidCastling(setup,index,newLocation,matchHistory)
        )
    }
    else {
        return "no corresponding piece type found"
    }

    
}

function listValidMoves(setup,index,matchHistory) {
    let validMoves = [];
    let piece = setup[index];

    if(piece.pieceType === "pawn") {
        if(isValidMovePawn1Forward(setup,index)) {

            if(piece.isplayerPiece) {
                validMoves.push({"row":piece.location.row + 1,"col":piece.location.col});
            }
            else {
                validMoves.push({"row":piece.location.row - 1,"col":piece.location.col});
            }    
        }
        if(isValidMovePawn2Forward(setup,index,matchHistory)) {

            if(piece.isplayerPiece) {
                validMoves.push({"row":piece.location.row + 2,"col":piece.location.col});
            }
            else {
                validMoves.push({"row":piece.location.row - 2,"col":piece.location.col});
            }
        }
        //if(isValid)
    }
}

function isGameOver(){}

function getEnemyNextMove(){}


//we specify here that we want to export these functions from the functions.js module
module.exports = {
    isValidSelection,
    isValidMove,
    listValidMoves,
    isGameOver,
    getEnemyNextMove
}