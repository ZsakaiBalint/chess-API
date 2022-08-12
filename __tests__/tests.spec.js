let functions = require("../functions"); 

describe("Testing", () => {
    test("chessBoardStartingSetup", () => {
      let obj1 = functions.chessBoardStartingSetup();
      let obj2 = [];

      var colToPiece = new Map([['a','rook'],['b','knight'],['c','bishop'],['d','queen'],['e','king'],['f','bishop'],['g','knight'],['h','rook']]);
      for(let i=0;i<8;++i) {
        let column = String.fromCharCode(97 + i); //a,b,c,d,e,f,g,h
        obj2.push({ location: {row: 1, col: column}, pieceType: colToPiece.get(column), isplayerPiece: true, isInGame: true });
        obj2.push({ location: {row: 2, col: column}, pieceType: "pawn", isplayerPiece: true, isInGame: true });
        obj2.push({ location: {row: 7, col: column}, pieceType: "pawn", isplayerPiece: false, isInGame: true });
        obj2.push({ location: {row: 8, col: column}, pieceType: colToPiece.get(column), isplayerPiece: false, isInGame: true });
      }

      expect(obj1).toEqual(obj2);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("checkPieceValidity row", () => {
      let obj = { location: {row: 15, col: 'e'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      
      expect(() => functions.checkPieceValidity(obj)).toThrow('The row number of the chess piece must be between 1-8!');
    });

    test("checkPieceValidity col", () => {
      let obj = { location: {row: 4, col: 'k'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      
      expect(() => functions.checkPieceValidity(obj)).toThrow('The column letter must be between a-h!');
    });

    test("checkPieceValidity pieceType", () => {
      let obj = { location: {row: 3, col: 'e'}, pieceType: "nOtAcHeSsPiEcE", isplayerPiece: false, isInGame: true }
      
      expect(() => functions.checkPieceValidity(obj)).toThrow('The chess piece type must be one of the following: pawn/rook/knight/bishop/queen/king!');
    });

    test("checkPieceValidity isPlayerPiece", () => {
      let obj = { location: {row: 4, col: 'e'}, pieceType: "bishop", isplayerPiece: 1, isInGame: true }
      
      expect(() => functions.checkPieceValidity(obj)).toThrow('The playerPiece property must be a boolean value!');
    });

    test("checkPieceValidity isInGame", () => {
      let obj = { location: {row: 4, col: 'e'}, pieceType: "bishop", isplayerPiece: true, isInGame: 1 }
      
      expect(() => functions.checkPieceValidity(obj)).toThrow('The isInGame property must be a boolean value!');
    });

    test("checkPieceValidity no exceptions", () => {
      let obj = { location: {row: 4, col: 'e'}, pieceType: "bishop", isplayerPiece: true, isInGame: true }
      
      expect(() => functions.checkPieceValidity(obj)).not.toThrowError();
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isInSameRow true", () => {
      let obj1 = { location: {row: 3, col: 'e'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 5, col: 'c'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(functions.isInSameRow(obj1,obj2)).toBe(false);
    });

    test("isInSameRow false", () => {
      let obj1 = { location: {row: 5, col: 'e'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 5, col: 'c'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(functions.isInSameRow(obj1,obj2)).toBe(true);
    });

    test("isInSameRow contains checkPieceValidity", () => {
      let obj1 = { location: {row: 19, col: 'e'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 5, col: 'c'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(() => functions.isInSameRow(obj1,obj2)).toThrow('The row number of the chess piece must be between 1-8!');
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isInSameCol true", () => {
      let obj1 = { location: {row: 3, col: 'c'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 5, col: 'c'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(functions.isInSameCol(obj1,obj2)).toBe(true);
    });

    test("isInSameCol false", () => {
      let obj1 = { location: {row: 3, col: 'e'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 5, col: 'c'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(functions.isInSameCol(obj1,obj2)).toBe(false);
    });

    test("isInSameCol contains checkPieceValidity", () => {
      let obj1 = { location: {row: 19, col: 'e'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 5, col: 'c'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(() => functions.isInSameCol(obj1,obj2)).toThrow('The row number of the chess piece must be between 1-8!');
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isInSameDiag left top", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 5, col: 'b'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(functions.isInSameDiag(obj1,obj2)).toBe(true);
    });

    test("isInSameDiag left bottom", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(functions.isInSameDiag(obj1,obj2)).toBe(true);
    });

    test("isInSameDiag right top", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 7, col: 'h'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(functions.isInSameDiag(obj1,obj2)).toBe(true);
    });

    test("isInSameDiag right bottom", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 1, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(functions.isInSameDiag(obj1,obj2)).toBe(true);
    });

    test("isInSameDiag false", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 3, col: 'e'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(functions.isInSameDiag(obj1,obj2)).toBe(false);
    });

    test("isInSameDiag contains checkPieceValidity", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 8, col: 'i'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(() => functions.isInSameDiag(obj1,obj2)).toThrow('The column letter must be between a-h!');
    });
});