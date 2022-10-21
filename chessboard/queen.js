class Queen extends ChessPiece {

    constructor(location,isPlayerPiece) {
        super(location,"queen",isPlayerPiece);
    }

    isValidAttackMoveQueen(setup,index,newLocation) {
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
}