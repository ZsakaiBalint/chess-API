//abstract parent class of all types of chess pieces
class ChessPiece {
    
    #location;
    #pieceType;
    #isPlayerPiece;
    #isInGame;

    constructor(location,pieceType,isPlayerPiece) {
        if(this.constructor === ChessPiece) {
            throw new Error("ChessPiece abstract class can not be instantiated!");
        }

    	if(!location.hasOwnProperty("row") || !location.hasOwnProperty("col")) {
        	throw new Error("location must have 'row' and 'col' properties!");
        }

        if(![1,2,3,4,5,6,7,8].includes(location.row)) {
        	throw new Error("row must be a number between 1-8");
        }
        
        if(!['a','b','c','d','e','f','g','h'].includes(location.col)) {
        	throw new Error("col must be a letter from a-h");
        }

        if(!["pawn","rook","knight","bishop","queen","king"].includes(pieceType)) {
            throw new Error("pieceType must be either pawn,rook,knight,bishop,queen or king")
        }

    	if(typeof this.isPlayerPiece !== "boolean" ) {
        	throw new Error("isPlayerPiece must be of type boolean!");
        }

        this.location = location;
        this.pieceType = pieceType;
        this.isPlayerPiece = isPlayerPiece;
        this.isInGame = true;
    }

    get #location() {
        return this.#location;
    }
    get #pieceType() {
        return this.#pieceType;
    }
    get #isPlayerPiece() {
        return this.#isPlayerPiece;
    }
    get #isInGame() {
        return this.#isInGame;
    }
}