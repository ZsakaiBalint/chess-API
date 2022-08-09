var functions = require("../functions"); 

describe("Testing", () => {
    test("chessBoardStartingSetup", () => {
      var jsonObj1 = functions.chessBoardStartingSetup();
      var jsonObj2 = [];

      var colToPiece = new Map([['a','rook'],['b','knight'],['c','bishop'],['d','queen'],['e','king'],['f','bishop'],['g','knight'],['h','rook']]);
      for(let i=0;i<8;++i) {
        var column = String.fromCharCode(97 + i); //a,b,c,d,e,f,g,h
        jsonObj2.push({ location: {row: 1, col: column}, pieceType: colToPiece.get(column), isplayerPiece: true, isInGame: true });
        jsonObj2.push({ location: {row: 2, col: column}, pieceType: "pawn", isplayerPiece: true, isInGame: true });
        jsonObj2.push({ location: {row: 7, col: column}, pieceType: "pawn", isplayerPiece: false, isInGame: true });
        jsonObj2.push({ location: {row: 8, col: column}, pieceType: colToPiece.get(column), isplayerPiece: false, isInGame: true });
      }

      expect(jsonObj1).toEqual(jsonObj2);
    });
});