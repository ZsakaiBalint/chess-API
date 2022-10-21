class Rook extends ChessPiece {

    constructor(location,isPlayerPiece) {
        super(location,"rook",isPlayerPiece);
    }

    //calculate if the rook is eligible to move to a certain place
    isValidAttackMoveRook(setup,index,newLocation) {
        
        let currentPiece = setup[index];
        if(currentPiece.pieceType !== "rook") {
            throw "The selected piece must be of type rook!"
        }

        return (
            (newLocation.col === currentPiece.location.col && newLocation.row !== currentPiece.location.row && noPieceBetweenInCol(setup,currentPiece.location,newLocation) ) ||
            (newLocation.row === currentPiece.location.row && newLocation.col !== currentPiece.location.col && noPieceBetweenInRow(setup,currentPiece.location,newLocation) )
        )
    }
}