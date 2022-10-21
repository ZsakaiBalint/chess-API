class Knight extends ChessPiece {

    constructor(location,isPlayerPiece) {
        super(location,"knight",isPlayerPiece);
    }

    isValidAttackMoveKnight(setup,index,newLocation) {

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
}