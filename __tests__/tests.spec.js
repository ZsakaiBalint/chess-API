let functions = require("../functions"); 

describe("Testing", () => {
    test("checkPieceValidity - row", () => {
      let obj = { location: {row: 15, col: 'e'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      
      expect(() => functions.checkPieceValidity(obj)).toThrow('The row number of the chess piece must be between 1-8!');
    });

    test("checkPieceValidity - col", () => {
      let obj = { location: {row: 4, col: 'k'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      
      expect(() => functions.checkPieceValidity(obj)).toThrow('The column letter must be between a-h!');
    });

    test("checkPieceValidity - pieceType", () => {
      let obj = { location: {row: 3, col: 'e'}, pieceType: "nOtAcHeSsPiEcE", isplayerPiece: false, isInGame: true }
      
      expect(() => functions.checkPieceValidity(obj)).toThrow('The chess piece type must be one of the following: pawn/rook/knight/bishop/queen/king!');
    });

    test("checkPieceValidity - isPlayerPiece", () => {
      let obj = { location: {row: 4, col: 'e'}, pieceType: "bishop", isplayerPiece: 1, isInGame: true }
      
      expect(() => functions.checkPieceValidity(obj)).toThrow('The playerPiece property must be a boolean value!');
    });

    test("checkPieceValidity - isInGame", () => {
      let obj = { location: {row: 4, col: 'e'}, pieceType: "bishop", isplayerPiece: true, isInGame: 1 }
      
      expect(() => functions.checkPieceValidity(obj)).toThrow('The isInGame property must be a boolean value!');
    });

    test("checkPieceValidity - no exceptions", () => {
      let obj = { location: {row: 4, col: 'e'}, pieceType: "bishop", isplayerPiece: true, isInGame: true }
      
      expect(() => functions.checkPieceValidity(obj)).not.toThrowError();
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("getPieceByLocation - defined outcome", () => {
      let setup = [
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'g'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.getPieceByLocation(setup,{row:4,col:'e'})).toStrictEqual({ location: {row: 4, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true });
    });

    test("getPieceByLocation - undefined outcome", () => {
      let setup = [
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'g'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.getPieceByLocation(setup,{row:7,col:'h'})).toBe(undefined);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isInSameRow - left", () => {
      let obj1 = { location: {row: 3, col: 'f'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 3, col: 'd'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(functions.isInSameRow(obj1,obj2)).toBe(true);
    });

    test("isInSameRow - right", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 3, col: 'f'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(functions.isInSameRow(obj1,obj2)).toBe(true);
    });

    test("isInSameRow - false", () => {
      let obj1 = { location: {row: 7, col: 'e'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 5, col: 'c'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(functions.isInSameRow(obj1,obj2)).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isInSamecol - top", () => {
      let obj1 = { location: {row: 3, col: 'c'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 5, col: 'c'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(functions.isInSamecol(obj1,obj2)).toBe(true);
    });

    test("isInSamecol - bottom", () => {
      let obj1 = { location: {row: 5, col: 'c'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 3, col: 'c'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(functions.isInSamecol(obj1,obj2)).toBe(true);
    });

    test("isInSamecol - false", () => {
      let obj1 = { location: {row: 3, col: 'e'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      let obj2 = { location: {row: 5, col: 'c'}, pieceType: "knight", isplayerPiece: true, isInGame: true }

      expect(functions.isInSamecol(obj1,obj2)).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isInSameDiag - left top", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 5, col: 'b'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(functions.isInSameDiag(obj1,obj2)).toBe(true);
    });

    test("isInSameDiag - left bottom", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(functions.isInSameDiag(obj1,obj2)).toBe(true);
    });

    test("isInSameDiag - right top", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 7, col: 'h'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(functions.isInSameDiag(obj1,obj2)).toBe(true);
    });

    test("isInSameDiag - right bottom", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 1, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(functions.isInSameDiag(obj1,obj2)).toBe(true);
    });

    test("isInSameDiag - false", () => {
      let obj1 = { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true }
      let obj2 = { location: {row: 3, col: 'e'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }

      expect(functions.isInSameDiag(obj1,obj2)).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("noPieceBetweenInRow - true", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'b'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenInRow(setup,0,2)).toBe(true);
    });

    test("noPieceBetweenInRow - false", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenInRow(setup,0,2)).toBe(false);
    });

    test("noPieceBetweenInRow - exception", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 3, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(() => functions.noPieceBetweenInRow(setup,0,2)).toThrow('The two chess pieces are not in the same row!');
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("noPieceBetweenIncol - true", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 5, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenIncol(setup,0,2)).toBe(true);
    });

    test("noPieceBetweenIncol - false", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenIncol(setup,0,2)).toBe(false);
    });

    test("noPieceBetweenIncol - excepion", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'e'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(() => functions.noPieceBetweenIncol(setup,0,2)).toThrow('The two chess pieces are not in the same column!');
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("noPieceBetweenindexiag - true", () => {
      let setup = [
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 5, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenindexiag(setup,0,2)).toBe(true);
    });

    test("noPieceBetweenindexiag - false", () => {
      let setup = [
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 5, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenindexiag(setup,0,2)).toBe(false);
    });

    test("noPieceBetweenindexiag - excepion", () => {
      let setup = [
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'g'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(() => functions.noPieceBetweenindexiag(setup,0,2)).toThrow('The two chess pieces are not in the same diagonal!');
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("wasPieceMoved - initial setup", () => {
      let setup = [
        { location: {row: 1, col: "a"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "b"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "c"}, pieceType: "bishop", isplayerPiece: true, isInGame: true }
      ];

      let matchHistory = [];

      expect(functions.wasPieceMoved(setup,0,matchHistory)).toBe(false);
    });

    test("wasPieceMoved - pawn", () => {
      let setup = [
        { location: {row: 1, col: "a"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "b"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "c"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "d"}, pieceType: "queen", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "e"}, pieceType: "king", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "f"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: true },

        { location: {row: 3, col: "a"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
      ];

      let matchHistory = ["a3"];

      expect(functions.wasPieceMoved(setup,8,matchHistory)).toBe(true);
    });

    test("wasPieceMoved - rook", () => {
      let setup = [
        { location: {row: 2, col: "a"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "b"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "c"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "d"}, pieceType: "queen", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "e"}, pieceType: "king", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "f"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: true },

        { location: {row: 3, col: "a"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
      ];

      let matchHistory = ["a3","g7","Ra2"];

      expect(functions.wasPieceMoved(setup,0,matchHistory)).toBe(true);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isValidMovePawn1Forward - true", () => {
      let setup = [
        { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.isValidMovePawn1Forward(setup,1,{row: 3,col: 'd'})).toBe(true);
    });

    test("isValidMovePawn1Forward - false - other piece at location", () => {
      let setup = [
        { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.isValidMovePawn1Forward(setup,1,{row: 3,col: 'd'})).toBe(false);
    });

    test("isValidMovePawn1Forward - false - invalid location", () => {
      let setup = [
        { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.isValidMovePawn1Forward(setup,1,{row: 7,col: 'g'})).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isValidMovePawn2Forward - true", () => {
      let setup = [
        { location: {row: 1, col: "a"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "b"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "c"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "d"}, pieceType: "queen", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "e"}, pieceType: "king", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "f"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: true },

        { location: {row: 2, col: "a"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
      ];

      let matchHistory = [];

      expect(functions.isValidMovePawn2Forward(setup,8,matchHistory)).toBe(true);
    });

    test("isValidMovePawn2Forward - false - other piece at location", () => {
      let setup = [
        { location: {row: 4, col: 'a'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 4, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true}
      ];

      let matchHistory = ["a3","d5","a4","d4"];

      expect(functions.isValidMovePawn2Forward(setup,1,{row: 4,col: 'd'},matchHistory)).toBe(false);
    });

    test("isValidMovePawn2Forward - false - other piece in front of location", () => {
      let setup = [
        { location: {row: 5, col: 'a'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true}
      ];

      let matchHistory = ["a3","d5","a4","d4","a5","d3"];

      expect(functions.isValidMovePawn2Forward(setup,1,{row: 3,col: 'd'},matchHistory)).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isValidAttackPawn - true", () => {
      let setup = [
        { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 3, col: 'c'}, pieceType: "pawn", isplayerPiece: false, isInGame: true}
      ];

      expect(functions.isValidAttackPawn(setup,1,{row: 3,col: 'c'})).toBe(true);
    });

    test("isValidAttackPawn - false - invalid location", () => {
      let setup = [
        { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 5, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true}
      ];

      expect(functions.isValidAttackPawn(setup,1,{row: 7,col: 'g'})).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isValidEnpassant - true", () => {
      let setup = [
        { location: {row: 5, col: 'c'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 6, col: 'a'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
        { location: {row: 5, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true}
      ];

      let matchHistory = ["c4","a6","c5","d5"];

      expect(functions.isValidEnpassant(setup,0,{row: 6,col: 'd'},matchHistory)).toBe(true);
    });

    test("isValidEnpassant - false - missed opportunity", () => {
      let setup = [
        { location: {row: 5, col: 'a'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 5, col: 'b'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 6, col: 'c'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
        { location: {row: 5, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true}
      ];

      let matchHistory = ["b4","d6","b5","c5","a3","d5"];

      expect(functions.isValidEnpassant(setup,1,{row: 6,col: 'c'},matchHistory)).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isValidPawnPromotion - true", () => {
      let setup = [
        { location: {row: 2, col: 'a'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 7, col: 'b'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true}
      ];

      let matchHistory = ["b4","d6","b5","d5","b6","d4","b7","d3"];

      expect(functions.isValidPawnPromotion(setup,1,{row: 8,col: 'b'},matchHistory)).toBe(true);
    });

    test("isValidPawnPromotion - false - bad location", () => {
      let setup = [
        { location: {row: 2, col: 'a'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 2, col: 'b'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 7, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true}
      ];

      let matchHistory = [];

      expect(functions.isValidPawnPromotion(setup,1,{row: 8,col: 'b'},matchHistory)).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});