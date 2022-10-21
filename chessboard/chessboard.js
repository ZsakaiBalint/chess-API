//stores the chess pieces and 
class ChessBoard {
    #matchHistory;
    #pieces;

    constructor(matchHistory){
        this.#matchHistory = new AlgebraicNotation(matchHistory);
        this.#pieces = [];

        this.#pieces.append(new Rook({'row':1,'col':'a'},true));
        this.#pieces.append(new Knight({'row':1,'col':'b'},true));
        this.#pieces.append(new Bishop({'row':1,'col':'c'},true));
        this.#pieces.append(new Queen({'row':1,'col':'d'},true));
        this.#pieces.append(new King({'row':1,'col':'e'},true));
        this.#pieces.append(new Bishop({'row':1,'col':'f'},true));
        this.#pieces.append(new Knight({'row':1,'col':'g'},true));
        this.#pieces.append(new Rook({'row':1,'col':'h'},true));

        this.#pieces.append(new Pawn({'row':2,'col':'a'},true));
        this.#pieces.append(new Pawn({'row':2,'col':'b'},true));
        this.#pieces.append(new Pawn({'row':2,'col':'c'},true));
        this.#pieces.append(new Pawn({'row':2,'col':'d'},true));
        this.#pieces.append(new Pawn({'row':2,'col':'e'},true));
        this.#pieces.append(new Pawn({'row':2,'col':'f'},true));
        this.#pieces.append(new Pawn({'row':2,'col':'g'},true));
        this.#pieces.append(new Pawn({'row':2,'col':'h'},true));

        this.#pieces.append(new Pawn({'row':7,'col':'a'},false));
        this.#pieces.append(new Pawn({'row':7,'col':'b'},false));
        this.#pieces.append(new Pawn({'row':7,'col':'c'},false));
        this.#pieces.append(new Pawn({'row':7,'col':'d'},false));
        this.#pieces.append(new Pawn({'row':7,'col':'e'},false));
        this.#pieces.append(new Pawn({'row':7,'col':'f'},false));
        this.#pieces.append(new Pawn({'row':7,'col':'g'},false));
        this.#pieces.append(new Pawn({'row':7,'col':'h'},false));

        this.#pieces.append(new Rook({'row':8,'col':'a'},false));
        this.#pieces.append(new Knight({'row':8,'col':'b'},false));
        this.#pieces.append(new Bishop({'row':8,'col':'c'},false));
        this.#pieces.append(new Queen({'row':8,'col':'d'},false));
        this.#pieces.append(new King({'row':8,'col':'e'},false));
        this.#pieces.append(new Bishop({'row':8,'col':'f'},false));
        this.#pieces.append(new Knight({'row':8,'col':'g'},false));
        this.#pieces.append(new Rook({'row':8,'col':'h'},false)); 
    }

    get #matchHistory() {
        return this.#matchHistory;
    }

    //returns a piece from the setup which is on a certain location, undefined if it doesn't exist
    getPieceByLocation(location) {
        let result = this.#pieces.find(item => item.location.row === location.row && item.location.col === location.col && item.isInGame);
        if(result === undefined) {
            throw new Error("There is no piece at the given location!");
        }
        return result;
    }

    //returns the piece's index which is on a certain location, -1 if it is doesn't exist
    getPieceIndexByLocation(location) {
        let result = this.#pieces.findIndex(item => item.location.row === location.row && item.location.col === location.col);
        if(result === -1) {
            throw new Error("There is no piece at the given location!");
        }
        return result;
    }

    //checks if two pieces are in the same row
    isInSameRow(location1,location2) {
        return location1.row === location2.row;
    }

    //checks if two pieces are in the same column
    isInSameCol(location1,location2) {
        return location1.col === location2.col;
    }

    //checks if two pieces are in the same diagonal line
    isInSameDiag(location1,location2) {
        let rowDiff = Math.abs(location1.row - location2.row);
        let colDiff = Math.abs(location1.col.charCodeAt(0) - location2.col.charCodeAt(0));
        return colDiff === rowDiff;
    }

    //checks if there is a piece in between two locations in a row
    noPieceBetweenInRow(setup,location1,location2) {
        if(!isInSameRow(location1,location2)) {
            throw "The two locations are not in the same row!";
        }
        for(let i=0;i<this.#pieces.length;++i) {
            //check if they are in the same column and the examined piece's row is between the two other location
            if((location1.col < setup[i].location.col && setup[i].location.col < location2.col) ||
            (location2.col < setup[i].location.col && setup[i].location.col < location1.col)
            ){
                return false;
            }
        }
        return true;
    }

    

    //return if the two pieces from setup have pieces in between them in a column (also works if there is no piece at the locations)
    noPieceBetweenInCol(setup,location1,location2) {
        
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
    noPieceBetweenInDiag(setup,location1,location2) {
            
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

    wasPieceMoved(setup,index,matchHistory = []) {

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







}