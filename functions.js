/*The functions consist of 2 parts:
    -the first part can be called by the player to check if the move they want to call on their chess piece is valid
    -the second part can be called by the player to request an enemy move
*/

//returns the initial layout of the chessboard
function chessBoardStartingSetup() {
    let setup = [
        { location: {row: 1, col: "a"}, pieceType: "rook", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 2, col: "a"}, pieceType: "pawn", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 7, col: "a"}, pieceType: "pawn", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 8, col: "a"}, pieceType: "rook", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 1, col: "b"}, pieceType: "knight", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 2, col: "b"}, pieceType: "pawn", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 7, col: "b"}, pieceType: "pawn", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 8, col: "b"}, pieceType: "knight", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 1, col: "c"}, pieceType: "bishop", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 2, col: "c"}, pieceType: "pawn", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 7, col: "c"}, pieceType: "pawn", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 8, col: "c"}, pieceType: "bishop", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 1, col: "d"}, pieceType: "queen", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 2, col: "d"}, pieceType: "pawn", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 7, col: "d"}, pieceType: "pawn", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 8, col: "d"}, pieceType: "queen", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 1, col: "e"}, pieceType: "king", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 2, col: "e"}, pieceType: "pawn", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 7, col: "e"}, pieceType: "pawn", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 8, col: "e"}, pieceType: "king", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 1, col: "f"}, pieceType: "bishop", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 2, col: "f"}, pieceType: "pawn", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 7, col: "f"}, pieceType: "pawn", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 8, col: "f"}, pieceType: "bishop", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 2, col: "g"}, pieceType: "pawn", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 7, col: "g"}, pieceType: "pawn", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 8, col: "g"}, pieceType: "knight", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 2, col: "h"}, pieceType: "pawn", isplayerPiece: true, isInGame: true, hasMoved: false },
        { location: {row: 7, col: "h"}, pieceType: "pawn", isplayerPiece: false, isInGame: true, hasMoved: false },
        { location: {row: 8, col: "h"}, pieceType: "rook", isplayerPiece: false, isInGame: true, hasMoved: false }
    ];
    return setup;
};

//all pieces should be in this form: { location: {row: 1, col: "a"}, pieceType: "rook", isplayerPiece: true, isInGame: true }
function checkPieceValidity(piece) {

    //check row
    if(piece.location.row < 1 || piece.location.row > 8 || piece.location.row % 1 != 0) {
        throw "The row number of the chess piece must be between 1-8!";
    }

    //check col
    if(!['a','b','c','d','e','f','g','h'].includes(piece.location.col)){
        throw "The column letter must be between a-h!";
    }

    //check piece type
    if(!["pawn","rook","knight","bishop","queen","king"].includes(piece.pieceType)) {
        throw "The chess piece type must be one of the following: pawn/rook/knight/bishop/queen/king!";
    }

    //check the "player's piece" property 
    if(typeof piece.isplayerPiece !== "boolean") {
        throw "The playerPiece property must be a boolean value!";
    }

    //check the "is in game" property
    if(typeof piece.isInGame !== "boolean") {
        throw "The isInGame property must be a boolean value!";
    }

}

function isInSameRow(piece1,piece2) {
    checkPieceValidity(piece1);
    checkPieceValidity(piece2);
    return piece1.location.row === piece2.location.row;
}

function isInSameCol(piece1,piece2) {
    checkPieceValidity(piece1);
    checkPieceValidity(piece2);
    return piece1.location.col === piece2.location.col;
}

function isInSameDiag(piece1,piece2) {
    checkPieceValidity(piece1);
    checkPieceValidity(piece2);

    let rowDiff = Math.abs(piece1.location.row - piece2.location.row);
    let colDiff = Math.abs(piece1.location.col.charCodeAt(0) - piece2.location.col.charCodeAt(0));
    return colDiff === rowDiff;
}

//check if there are any chess pieces in the setup between two pieces
function noPieceBetweenInRow(setup,ind1,ind2) {

    if(!isInSameRow(setup[ind1],setup[ind2])) {
        throw "The two chess pieces are not in the same row!";
    }
    //setup.forEach(piece => {checkPieceValidity(piece)});

    for(const [index,element] of setup.entries()) {
        //don't check the mentioned two pieces
        if(index === ind1 || index === ind2) {
            continue;
        }
        else {
            //check if they are in the same row and the examined piece's column is between the two other pieces'
            if(isInSameRow(setup[ind1],element) && (
            (setup[ind1].location.col < element.location.col && element.location.col < setup[ind2].location.col) ||
            (setup[ind2].location.col < element.location.col && element.location.col < setup[ind1].location.col)
            )){
                return false;
            }
        }
    }

    return true;
}

function noPieceBetweenInCol(setup,ind1,ind2) {
    
    if(!isInSameCol(setup[ind1],setup[ind2])) {
        throw "The two chess pieces are not in the same column!";
    }
    //setup.forEach(piece => {checkPieceValidity(piece)});

    for(const [index,element] of setup.entries()) {
        //don't check the mentioned two pieces
        if(index === ind1 || index === ind2) {
            continue;
        }
        else {
            //check if they are in the same column and the examined piece's row is between the two other pieces'
            if(isInSameCol(setup[ind1],element) && (
            (setup[ind1].location.row < element.location.row && element.location.row < setup[ind2].location.row) ||
            (setup[ind2].location.row < element.location.row && element.location.row < setup[ind1].location.row)
            )){
                return false;
            }
        }
    }

    return true;
}

function noPieceBetweenInDiag(setup,ind1,ind2) {
        
    if(!isInSameDiag(setup[ind1],setup[ind2])) {
        throw "The two chess pieces are not in the same diagonal!";
    }
    //setup.forEach(piece => {checkPieceValidity(piece)});

    for(const [index,element] of setup.entries()) {
        //don't check the mentioned two pieces
        if(index === ind1 || index === ind2) {
            continue;
        }
        else {
            //check if they are in the same diagonal and the examined piece's row is between the two other pieces'
            if(isInSameDiag(setup[ind1],element) && (
            (setup[ind1].location.row < element.location.row && element.location.row < setup[ind2].location.row) ||
            (setup[ind2].location.row < element.location.row && element.location.row < setup[ind1].location.row)
            )){
                return false;
            }
        }
    }

    return true;
}

//returns a piece from the setup which has a certain location, null if it doesn't exist
function getPieceByLocation(setup,expectedLocation) {
    let result = setup.find(item => item.location.row === expectedLocation.row && item.location.col == expectedLocation.col);
    return result;
}

//calculates if the pawn at 'ind' is eligible to move 1 tile forward - to 'newLocation' - from the chessboard 'setup' 
function isValidMovePawn1Forward(setup,ind,newLocation) {
    //it's the player's pawn and the newLocation is 1 row ahead of it and there is no other piece there
    return (
    setup[ind].isplayerPiece && 
    setup[ind].pieceType === "pawn" &&
    newLocation.row === setup[ind].location.row + 1 &&
    newLocation.col === setup[ind].location.col && 
    getPieceByLocation(setup,newLocation) === undefined
    )
}

//calculates if the pawn at 'ind' is eligible to move 2 tile forward - to 'newLocation' - from the chessboard 'setup' 
function isValidMovePawn2Forward(setup,ind,newLocation) {
    //it's the player's pawn and hasn't moved yet (first move)
    //the newLocation is 2 rows ahead of it and there is no other piece there
    //or in front of the pawn
    return (
    setup[ind].isplayerPiece &&
    setup[ind].pieceType === "pawn" &&
    setup[ind].hasMoved === false &&
    newLocation.row === setup[ind].location.row + 2 &&
    newLocation.col === setup[ind].location.col && 
    getPieceByLocation(setup,newLocation) === undefined &&
    getPieceByLocation(setup,{row: newLocation.row - 1, col: newLocation.col}) === undefined
    )
}

//calculates if the pawn at 'ind' is eligible to attack 1 forward diagonally
function isValidAttackPawn(setup,ind,newLocation) {
    //it's the player's pawn, there is an enemy piece there, and the new location is diagonally 1 forward
    return (
    setup[ind].isplayerPiece &&
    setup[ind].pieceType === "pawn" &&
    !getPieceByLocation(setup,location).isplayerPiece &&
    newLocation.row === setup[ind].location.row + 1 &&
    ((newLocation.col === setup[ind].location.row.charCodeAt(0) + 1) || (newLocation.col === setup[ind].location.row.charCodeAt(0) - 1))
    )
}

//we specify here that we want to export these functions from the functions.js module
module.exports = {
    chessBoardStartingSetup,
    checkPieceValidity,
    isInSameRow,
    isInSameCol,
    isInSameDiag,
    noPieceBetweenInRow,
    noPieceBetweenInCol,
    noPieceBetweenInDiag,
    getPieceByLocation,
    isValidMovePawn1Forward,
    isValidMovePawn2Forward,
    isValidAttackPawn
}