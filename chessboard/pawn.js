class Pawn extends ChessPiece {

    constructor(location,isPlayerPiece) {
        super(location,"pawn",isPlayerPiece);
    }

    //calculates if the pawn at 'index' is eligible to move 1 tile forward - to 'newLocation' - from the chessboard 'setup' 
    isValidMovePawn1Forward(setup,index) {

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

    isValidMovePawn2Forward(setup,index,matchHistory) {
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
    isValidAttackPawn(setup,index,newLocation) {
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

    //calculate if the pawn at 'index' is eligible for an enpassant, previous move looks like this: { location: {row: 1, col: "a"}, index: 7 },
    isValidEnpassant(setup,index,newLocation,matchHistory) {

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
    isValidPawnPromotion(setup,index,newLocation) {

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
    getPossiblePromotions(){
        return ["rook","knight","bishop","queen"];
    }

}