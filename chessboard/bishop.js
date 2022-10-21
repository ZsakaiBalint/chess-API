class Bishop extends ChessPiece {

    constructor(location,isPlayerPiece) {
        super(location,"bishop",isPlayerPiece);
    }

    isValidAttackMoveBishop(setup,index,newLocation) {
    
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
}