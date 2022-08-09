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
});