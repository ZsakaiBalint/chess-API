//A static class that tests algebraic notations

class AlgebraicNotation {
    /*
    ALGEBRAIC NOTATION HELP:

    The moves are written in two numbered vertical columns like this:
        1.f2-f4 	e7-e5
        2.f4xe5	    d7-d6
        3.e5xd6 	Bf8xd6
        4.g2-g3 	Qd8-g5
        5.Ng1-f3	Qg5xg3+
        6.h2xg3 	Bd6xg3#

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
            identify the piece – which occurs only in rare cases where a player has three or more 
            identical pieces able to reach the same square, as a result of one or more pawns having promoted).
        e.g. Qh4xe1 - queen on h4 captures piece on e1

    Pawn promotion: When a pawn promotes, the piece promoted to is indicated at the end of the move notation
    e.g. e8Q (promoting to queen)

    Castling: castling is indicated by the special notations 0-0 (for kingside castling) and 0-0-0 (queenside castling).

    Check: A move that places the opponent's king in check usually has the symbol "+" appended. e.g. Rdf8+ - rook in d column moves to f8 and gives check

    Checkmate: Checkmate at the completion of moves is represented by the symbol "#" e.g. Rdf8#

    End of game: The notation 1–0 at the completion of moves indicates that White won, 0–1 indicates that Black won, and ½–½ indicates a draw.
    */ 

    //checks if one note from an algebraic notation is valid like 'Qh4e1'
    static isValidNotation(notation) {
        //white won, black won, draw, kingside castling, queenside castling
        if(notation === "1-0" || notation === "0-1" || notation === "½–½" || notation === "0-0" || notation === "0-0-0") {
            return true
        }
        //the notation is of type pawn
        else if(!notation.startsWith('R') && !notation.startsWith('N') && !notation.startsWith('B') && 
        !notation.startsWith('Q') && !notation.startsWith('K')){

            let pawnBasicMoves = /^([a-h]x|x)?[a-h][1-8](\+|#)?$/;
            let pawnPromotions = /^([a-h]x|x)?[a-h]8(R|N|B|Q)(\+|#)?$/;

            //if it has two letters from a-h they must be next to each other (because pawns can only attack diagonally)
            //semantical test
            let columnLetters = notation.split('').filter( (letter) =>['a','b','c','d','e','f','g','h'].includes(letter) )
            
            if(columnLetters.length === 1) {
                return pawnBasicMoves.test(notation) || pawnPromotions.test(notation)
            }
            else if(columnLetters.length === 2) {
                let columnDiff = Math.abs(columnLetters[0].charCodeAt(0) - columnLetters[1].charCodeAt(0))
                return columnDiff === 1 && (pawnBasicMoves.test(notation) || pawnPromotions.test(notation))
            }  

        }
        //the notation is of type rook
        else if(notation.startsWith('R')) {
            let rookMoves = /^R([1-8]|[a-h]|)?x?[a-h][1-8](\+|#)?$/
            return rookMoves.test(notation)
        }
        //the notation is of type knight
        else if(notation.startsWith('N')) {
            let knightMoves = /^N([a-h][1-8]|[1-8]|[a-h]|)?x?[a-h][1-8](\+|#)?$/;
            
            let columnLetters = notation.split('').filter( (letter) =>['a','b','c','d','e','f','g','h'].includes(letter) )
            let rowLetters = notation.split('').filter( (letter) =>['1','2','3','4','5','6','7','8'].includes(letter) )
            
            //if we need both row and column to identify the piece
            if(columnLetters.length === 2 && rowLetters.length === 2) {
                let columnDiff = Math.abs(columnLetters[0].charCodeAt(0) - columnLetters[1].charCodeAt(0))
                let rowDiff = Math.abs(rowLetters[0] - rowLetters[1])
                return (columnDiff === 1 && rowDiff === 2 && knightMoves.test(notation)) ||
                (columnDiff === 2 && rowDiff === 1 && knightMoves.test(notation))
            }
            else {
                return knightMoves.test(notation)
            }
        }
        //the notation is of type bishop
        else if(notation.startsWith('B')) {
            let bishopMoves = /^B([a-h][1-8]|[1-8]|[a-h]|)?x?[a-h][1-8](\+|#)?$/;

            let columnLetters = notation.split('').filter( (letter) =>['a','b','c','d','e','f','g','h'].includes(letter) )
            let rowLetters = notation.split('').filter( (letter) =>['1','2','3','4','5','6','7','8'].includes(letter) )
            
            //if we need both row and column to identify the piece
            if(columnLetters.length === 2 && rowLetters.length === 2) {
                let columnDiff = Math.abs(columnLetters[0].charCodeAt(0) - columnLetters[1].charCodeAt(0))
                let rowDiff = Math.abs(rowLetters[0] - rowLetters[1])
                return columnDiff === rowDiff && bishopMoves.test(notation)
            }
            else {
                return bishopMoves.test(notation)
            }
        }
        //the notation is of type queen
        else if(notation.startsWith('Q')) {
            let queenMoves = /^Q([a-h][1-8]|[1-8]|[a-h]|)?x?[a-h][1-8](\+|#)?$/;
        
            let columnLetters = notation.split('').filter( (letter) =>['a','b','c','d','e','f','g','h'].includes(letter) )
            let rowLetters = notation.split('').filter( (letter) =>['1','2','3','4','5','6','7','8'].includes(letter) )
            
            //if we need both row and column to identify the piece
            if(columnLetters.length === 2 && rowLetters.length === 2) {
                let columnDiff = Math.abs(columnLetters[0].charCodeAt(0) - columnLetters[1].charCodeAt(0))
                let rowDiff = Math.abs(rowLetters[0] - rowLetters[1])
                return columnDiff === rowDiff && queenMoves.test(notation)
            }
            else {
                return queenMoves.test(notation)
            }
        }
        //the notation is of type king
        else if(notation.startsWith('K')) {
            let kingMoves = /^Kx?[a-h][1-8](\+|#)?$/;
            return kingMoves.test(notation)
        }
        else {
            return false
        }
    }


    //check if all notations are valid in the array
    static isValidMatchHistory(matchHistory) {
        return true;
    }

    //get all moves conducted by the player
    static getPlayerHistory(matchHistory) {
        let returnArr = [];
        matchHistory.forEach(row => {
            //cut the number, the dot and the whitespace from the start of the string
            //and get the first half
            let notation = row.replace(/^\d+\.\s+/, '').split(' ')[0];
            if(notation !== undefined) {
                returnArr.push(notation);
            }
        })
        return returnArr;
    }
    
    //get all moves conducted by the enemy (AI)
    static getEnemyHistory(matchHistory) {
        let returnArr = [];
        matchHistory.forEach(row => {
            //cut the number, the dot and the whitespace from the start of the string
            //and get the second half
            let notation = row.replace(/^\d+\.\s+/, '').split(' ')[1];
            if(notation !== undefined) {
                returnArr.push(notation);
            }
        })
        return returnArr;
    }
}

module.exports = {
    AlgebraicNotation
};


