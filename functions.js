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

function objectEqueal(obj1, obj2) {
    let obj1Length = Object.keys(obj1).length;
    let obj2Length = Object.keys(obj2).length;

    if (obj1Length === obj2Length) {
        return Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj2[key] === obj1[key]);
    }
    return false;
}

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
    let result = setup.find(item => item.location.row === expectedLocation.row && item.location.col === expectedLocation.col && item.isInGame);
    return result;
}

//returns the piece's index which is on a certain location, -1 if it is doesn't exist
function getIndexByLocation(setup,expectedLocation) {
    let result = setup.findIndex(item => item.location.row === expectedLocation.row && item.location.col === expectedLocation.col);
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

//ALGEBRAIC NOTATION HELP:
/*
Chess phrases:
    file    - column
    rank    - row

Naming the pieces:
    pawn    - no name
    rook    - R
    knight  - N
    bishop  - B
    queen   - Q
    king    - K

Notation for moves: first, the name of the piece then the tile it moves to
    c5      - pawn moves to c5
    Be5     - bishop moves to e5

Notation for captures: when a piece makes a capture, an "x" is inserted before the destination square
    exd5    - pawn on the e-file (e column) captures the piece on d5
    Bxe5    - bishop captures the piece on e5

    En passant captures are indicated by specifying 
    - the capturing pawn's file of departure, 
    - the "x", 
    - the destination square (not the square of the captured pawn)
    e.g. exd6

Disambiguating moves: When two (or more) identical pieces can move to the same square, the moving piece is uniquely 
identified by specifying the piece's letter, followed by (in descending order of preference):
    1. the file (column) of departure (if they differ); e.g. Rdf8 - rook in d column moves to f8

    2. the rank (row) of departure (if the files are the same but the ranks differ) e.g. R1a3 - rook in first row moves to a3

    3. both the file and rank of departure (if neither alone is sufficient to 
        identify the piece ??? which occurs only in rare cases where a player has three or more 
        identical pieces able to reach the same square, as a result of one or more pawns having promoted).
    e.g. Qh4xe1 - queen on h4 captures piece on e1

Pawn promotion: When a pawn promotes, the piece promoted to is indicated at the end of the move notation
e.g. e8Q (promoting to queen)

Castling: castling is indicated by the special notations 0-0 (for kingside castling) and 0-0-0 (queenside castling).

Check: A move that places the opponent's king in check usually has the symbol "+" appended. e.g. Rdf8+ - rook in d column moves to f8 and gives check

Checkmate: Checkmate at the completion of moves is represented by the symbol "#" e.g. Rdf8#

End of game: The notation 1???0 at the completion of moves indicates that White won, 0???1 indicates that Black won, and ??????? indicates a draw.

Rook possible moves
R must                              - R
g3 (see disambiguating)             - R([a-h][1-8]|[a-h]|[1-8])?
x not must                          - R([a-h][1-8]|[a-h]|[1-8])?x?
g8 from variable                    - R([a-h][1-8]|[a-h]|[1-8])?x?${initPieceLocation.col}${initPieceLocation.row}
+ not must                          - R([a-h][1-8]|[a-h]|[1-8])?x?${initPieceLocation.col}${initPieceLocation.row}\+?
 
King possible moves
K must                              - K
x not must                          - Kx?
g3 from variable                    - Kx?${initPieceLocation.col}${initPieceLocation.row}
+ not must                          - Kx?${initPieceLocation.col}${initPieceLocation.row}\+?
*/ 

function wasPieceMoved(setup,index,matchHistory = []) {

    if(matchHistory === []) {
        return false;
    }

    let piece = setup[index];
    let initPieceLocation = chessBoardStartingSetup()[index].location; //the initial location of the pice on game start

    //pawns can't move back to their starting position
    if(piece.pieceType === "pawn"){
        return initPieceLocation.row !== piece.location.row || //the piece's location is not the starting location
        initPieceLocation.col !== piece.location.col
    } 

    //rooks and the king can move back to their starting position
    else if(piece.pieceType === "rook" || piece.pieceType === "king") {

        let regex;
        if(piece.pieceType === "rook") {
            regex = new RegExp(`R([a-h][1-8]|[a-h]|[1-8])?x?${initPieceLocation.col}${initPieceLocation.row}\+?`)
        } 
        else if(piece.pieceType === "king") {
            regex = new RegExp(`Kx?${initPieceLocation.col}${initPieceLocation.row}\+?`)
        }
        
        for(var i=0;i<matchHistory.length;++i) {
            if(initPieceLocation.row !== piece.location.row || //the piece's location is not the starting location
            initPieceLocation.col !== piece.location.col ||
            regex.test(matchHistory[i])) { //there was an occasion when a rook/king moved back to the starting location
                return true;
            }
        }
        return false;
    }

    else {
        throw "It is sufficient to know only if the designated pawn/rook/king was moved or not!"
    }

}

//calculates if the pawn at 'index' is eligible to move 1 tile forward - to 'newLocation' - from the chessboard 'setup' 
function isValidMovePawn1Forward(setup,index) {

    let piece = setup[index];

    if(piece.pieceType !== "pawn") {
        throw "The selected piece must be of type pawn!"
    }

    if(piece.isplayerPiece) {
        return getPieceByLocation(setup,{"row":piece.location.row + 1,"col":piece.location.col}) === undefined //there is no piece in front of it 1 row ahead 
    }
    else {
        return getPieceByLocation(setup,{"row":piece.location.row - 1,"col":pdiece.location.col}) === undefined //there is no piece in front of it 1 row ahead 
    }  
    
}

function isValidMovePawn2Forward(setup,index,matchHistory) {
    let piece = setup[index];

    if(piece.pieceType !== "pawn") {
        throw "The selected piece must be of type pawn!"
    }

    if(piece.isplayerPiece) {
        return (
            wasPieceMoved(setup,index,matchHistory) === false && //it wasn't moved yet (first move) 
            getPieceByLocation(setup,{"row":piece.location.row+2,"col":piece.location.col}) === undefined && //there is no piece in front of it 2 rows ahead
            getPieceByLocation(setup,{"row":piece.location.row+1,"col":piece.location.col}) === undefined //there is no piece in front of it 1 row ahead
        )
    }
    else {
        return (
            wasPieceMoved(setup,index,matchHistory) === false && //it wasn't moved yet (first move) 
            getPieceByLocation(setup,{"row":piece.location.row-2,"col":piece.location.col}) === undefined && //there is no piece in front of it 2 rows ahead
            getPieceByLocation(setup,{"row":piece.location.row-1,"col":piece.location.col}) === undefined //there is no piece in front of it 1 row ahead
        )
    }

}

//calculates if the pawn at 'index' is eligible to attack 1 forward diagonally
function isValidAttackPawn(setup,index,newLocation) {
    let piece = setup[index];

    if(piece.pieceType !== "pawn") {
        throw "The selected piece must be of type pawn!"
    }

    if(piece.isplayerPiece) {
        return (
            getPieceByLocation(setup,newLocation) !== undefined && //lazy eval
            getPieceByLocation(setup,newLocation).isplayerPiece === false && //there is an enemy piece there
            newLocation.row === piece.location.row + 1 && //the new location is diagonally 1 forward
            ((newLocation.col.charCodeAt(0) === piece.location.col.charCodeAt(0) + 1) || (newLocation.col.charCodeAt(0) === piece.location.col.charCodeAt(0) - 1))
        )
    }
    else {
        return (
            getPieceByLocation(setup,newLocation) !== undefined && //lazy eval
            getPieceByLocation(setup,newLocation).isplayerPiece === true && //there is an ally piece there
            newLocation.row === piece.location.row - 1 && //the new location is diagonally 1 forward
            ((newLocation.col.charCodeAt(0) === piece.location.col.charCodeAt(0) + 1) || (newLocation.col.charCodeAt(0) === piece.location.col.charCodeAt(0) - 1))
        )
    }

}

function getPlayerHistory(matchHistory) {
    return matchHistory.filter((element,index) => index % 2 === 0);
}

function getEnemyHistory(matchHistory) {
    return matchHistory.filter((element,index) => index % 2 === 1);
}

//calculate if the pawn at 'index' is eligible for an enpassant, previous move looks like this: { location: {row: 1, col: "a"}, index: 7 },
function isValidEnpassant(setup,index,newLocation,matchHistory) {

    let lastMove = matchHistory.last(); //like "b3"
    let piece = setup[index];
    let capturedPiece = {}

    if(piece.isplayerPiece) {
        capturedPiece = getPieceByLocation(setup,{col: newLocation.col,row:5})
    }
    else {
        capturedPiece = getPieceByLocation(setup,{col: newLocation.col,row:4})
    }

    if(capturedPiece === undefined || capturedPiece.pieceType !== "pawn") {return false}

    if(piece.pieceType !== "pawn") {
        throw "The selected piece must be of type pawn!"
    }

    //player's pawn
    if(piece.isplayerPiece) {
        let enemyHistory = getEnemyHistory(matchHistory)

        if(
            /[a-h]5/.test(lastMove) && //the last move was a player pawn in the 4th row
            piece.location.row === 5 && (piece.location.col.charCodeAt(0) === capturedPiece.location.col.charCodeAt(0)+1 || piece.location.col.charCodeAt(0) === capturedPiece.location.col.charCodeAt(0)-1) && //the ally pawn is next to it
            newLocation.row === 6 && newLocation.col === capturedPiece.location.col && //the enemy wants to move their pawn behind the player pawn
            getPieceByLocation(setup,{"row":6,"col":capturedPiece.location.col}) === undefined //there is no piece there
        ) {
                for(let i=0;i<enemyHistory.length;++i) { //iterate through the moves
                    if(enemyHistory[i] === lastMove[0]+'6'){return false} //it wasn't a 2 forward move that happened in the last move
                }
                return true;
            }
        else {
            return false
        }
    }

    //enemy pawn
    else if(!piece.isplayerPiece) {
        let playerHistory = getPlayerHistory(matchHistory)

        if(
            /[a-h]4/.test(lastMove) && //the last move was a player pawn in the 4th row
            piece.location.row === 4 && (piece.location.col.charCodeAt(0) === capturedPiece.location.col.charCodeAt(0)+1 || piece.location.col.charCodeAt(0) === capturedPiece.location.col.charCodeAt(0)-1) && //the ally pawn is next to it
            newLocation.row === 3 && newLocation.col === capturedPiece.location.col && //the enemy wants to move their pawn behind the player pawn
            getPieceByLocation(setup,{"row":3,"col":capturedPiece.location.col}) === undefined //there is no piece there
        ) {
                for(let i=0;i<playerHistory.length;++i) { //iterate through the moves
                    if(playerHistory[i] === lastMove[0]+'3'){return false} //it wasn't a 2 forward move that happened in the last move
                }
                return true;
            }
        else {
            return false
        }
    }


}
      
//calculate if the pawn at setup[ind] is eligible to pawn promotion when stepping to newLocation
function isValidPawnPromotion(setup,index,newLocation) {

    let piece = setup[index];

    if(piece.pieceType !== "pawn") {
        throw "The selected piece must be of type pawn!"
    }

    if(piece.isplayerPiece) {
        return (
            newLocation.row === piece.location.row + 1 && newLocation.col === piece.location.col && //the player wants to move their pawn 1 forward
            newLocation.row === 8 && //to the last row
            getPieceByLocation(setup,{"row":newLocation.row,"col":newLocation.col}) === undefined//and there is no enemy piece there
        )
    }
    else if(!piece.isplayerPiece) {
        return (
            newLocation.row === piece.location.row - 1 && newLocation.col === piece.location.col && //the enemy wants to move their pawn 1 forward
            newLocation.row === 1 && //to the last row
            getPieceByLocation(setup,{"row":newLocation.row,"col":newLocation.col}) === undefined//and there is no enemy piece there
        )
    }


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

function isValidAttackMoveKing(setup,index,newLocation) {

    let currentPiece = setup[index];
    if(currentPiece.pieceType !== "king") {
        throw "The selected piece must be of type king!"
    }

    let rowDiff = Math.abs(currentPiece.location.row - newLocation.row)
    let colDiff = Math.abs(currentPiece.location.col.charCodeAt(0) - newLocation.col.charCodeAt(0))

    return (getPieceByLocation(setup,newLocation) === undefined ||  getPieceByLocation(setup,newLocation).isplayerPiece === false) &&
    (0 < rowDiff + colDiff && rowDiff + colDiff <= 2 && rowDiff <= 1 && colDiff <= 1)
}

//the index is the king's index
function isValidCastling(setup,index,newLocation,matchHistory = []) {

    let kingPiece = setup[index];
    if(kingPiece.pieceType !== "king") {
        throw "The selected piece must be of type king!"
    }

    let rookPiece = {} //we need to know which rook we want to perform the castling with

    if(objectEqual(newLocation,{"row":1,"col":'g'})) { //short castling player
        rookPiece = getPieceByLocation({"row":1,"col":'h'})
    }
    else if(objectEqual(newLocation,{"row":1,"col":'c'})) { //long castling player
        rookPiece = getPieceByLocation({"row":1,"col":'a'})
    }
    else if(objectEqual(newLocation,{"row":1,"col":'g'})) { //short castling enemy
        rookPiece = getPieceByLocation({"row":8,"col":'h'})
    }
    else if(objectEqual(newLocation,{"row":8,"col":'c'})) { //long castling enemy
        rookPiece = getPieceByLocation({"row":8,"col":'a'})
    }
    else {
        return false
    }

    if(rookPiece === undefined || rookPiece.pieceType !== "rook") {
        return false
    }

    let kingIndex = index
    let rookIndex = getIndexByLocation(setup,rookPiece.location)

    return !wasPieceMoved(setup,kingIndex,matchHistory) && !wasPieceMoved(setup,rookIndex,matchHistory) && //the king and the rook were not moved yet
    noPieceBetweenInRow(setup,kingPiece.location,rookPiece.location) //there is no piece between them
}

//returns if the king is in check (works on both sides)
function isInCheck(setup,isPlayerKing=true,matchHistory) {

    //which king we are working with
    let kingPiece
    isPlayerKing ? kingPiece = setup[4] : kingPiece = setup[28]

    //check for all pieces of the other player if it's a valid attack to the king's location
    for(let i=0;i<32;++i) {
        //XOR
        if( (kingPiece.isplayerPiece && !setup[i].isplayerPiece) || (!kingPiece.isplayerPiece && setup[i].isplayerPiece) ) {
            switch(setup[i].pieceType) {
                case "pawn":
                    if(isValidAttackPawn(setup,i,kingPiece.location) || isValidEnpassant(setup,i,kingPiece.location,matchHistory)){return true}
                    break;
                case "rook":
                    if(isValidAttackMoveRook(setup,i,kingPiece.location)){return true}
                    break;
                case "knight":
                    if(isValidAttackMoveKnight(setup,i,kingPiece.location)){return true}
                    break;
                case "bishop":
                    if(isValidAttackMoveBishop(setup,i,kingPiece.location)){return true}
                    break;
                case "queen":
                    if(isValidAttackMoveQueen(setup,i,kingPiece.location)){return true}
                    break;
                case "king":
                    if(isValidAttackMoveKing(setup,i,kingPiece.location)){return true}
                    break;
            }
        }
    }
    return false

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//return true if the selection/reselection is valid
function isValidSelection(setup,location) {
    let targetPiece = getPieceByLocation(setup,location)
    return targetPiece !== undefined && targetPiece.isplayerPiece
}

//return true if the piece from setup at index can move to newlocation based on matchistory
function isValidMove(setup,index,newLocation,matchHistory){
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


//we specify here that we want to export these functions from the functions.js module
module.exports = {
    chessBoardStartingSetup,
    checkPieceValidity,
    getPieceByLocation,
    getIndexByLocation,
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
    isValidAttackMoveQueen,
    isValidAttackMoveKing,
    isValidCastling,
    isInCheck,
    isValidSelection
}