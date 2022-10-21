class King extends ChessPiece {

    constructor(location,isPlayerPiece) {
        super(location,"king",isPlayerPiece);
    }

    isValidAttackMoveKing(setup,index,newLocation) {

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
    isValidCastling(setup,index,newLocation,matchHistory = []) {

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
    isInCheck(setup,isPlayerKing=true,matchHistory) {

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
}