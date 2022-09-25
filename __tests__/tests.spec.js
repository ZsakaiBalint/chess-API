//include functions
const functions = require("../functions");

//for endpoint testing include supertest
const request = require("supertest")
const app = require("../app");
const { json } = require("express");

describe("UNIT TESTS", () => {
    test("isValidPiece - row", () => {
      let obj = { location: {row: 15, col: 'e'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      
      expect(() => functions.isValidPiece(obj)).toThrow('The row number of the chess piece must be between 1-8!');
    });

    test("isValidPiece - col", () => {
      let obj = { location: {row: 4, col: 'k'}, pieceType: "bishop", isplayerPiece: false, isInGame: true }
      
      expect(() => functions.isValidPiece(obj)).toThrow('The column letter must be between a-h!');
    });

    test("isValidPiece - pieceType", () => {
      let obj = { location: {row: 3, col: 'e'}, pieceType: "nOtAcHeSsPiEcE", isplayerPiece: false, isInGame: true }
      
      expect(() => functions.isValidPiece(obj)).toThrow('The chess piece type must be one of the following: pawn/rook/knight/bishop/queen/king!');
    });

    test("isValidPiece - isPlayerPiece", () => {
      let obj = { location: {row: 4, col: 'e'}, pieceType: "bishop", isplayerPiece: 1, isInGame: true }
      
      expect(() => functions.isValidPiece(obj)).toThrow('The playerPiece property must be a boolean value!');
    });

    test("isValidPiece - isInGame", () => {
      let obj = { location: {row: 4, col: 'e'}, pieceType: "bishop", isplayerPiece: true, isInGame: 1 }
      
      expect(() => functions.isValidPiece(obj)).toThrow('The isInGame property must be a boolean value!');
    });

    test("isValidPiece - no exceptions", () => {
      let obj = { location: {row: 4, col: 'e'}, pieceType: "bishop", isplayerPiece: true, isInGame: true }
      
      expect(() => functions.isValidPiece(obj)).not.toThrowError();
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
    test("getIndexByLocation - defined outcome - player piece", () => {
      let setup = [
        { location: {row: 2, col: "e"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "f"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "g"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "h"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 7, col: "a"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "b"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "c"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "d"}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.getIndexByLocation(setup,{row:2,col:'g'})).toBe(2);
    });

    test("getIndexByLocation - defined outcome - enemy piece", () => {
      let setup = [
        { location: {row: 2, col: "e"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "f"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "g"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "h"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 7, col: "a"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "b"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "c"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "d"}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.getIndexByLocation(setup,{row:7,col:'b'})).toBe(5);
    });

    test("getIndexByLocation - undefined - no piece found", () => {
      let setup = [
        { location: {row: 2, col: "e"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "f"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "g"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "h"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 7, col: "a"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "b"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "c"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "d"}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.getIndexByLocation(setup,{row:1,col:'a'})).toBe(-1);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isInSameRow - left", () => {
      let location1 = {row: 3, col: 'f'}
      let location2 = {row: 3, col: 'd'}

      expect(functions.isInSameRow(location1,location2)).toBe(true);
    });

    test("isInSameRow - right", () => {
      let location1 = {row: 3, col: 'd'}
      let location2 = {row: 3, col: 'f'}

      expect(functions.isInSameRow(location1,location2)).toBe(true);
    });

    test("isInSameRow - false", () => {
      let location1 = {row: 7, col: 'e'}
      let location2 = {row: 5, col: 'c'}

      expect(functions.isInSameRow(location1,location2)).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isInSameCol - top", () => {
      let location1 = {row: 3, col: 'c'}
      let location2 = {row: 5, col: 'c'}

      expect(functions.isInSameCol(location1,location2)).toBe(true);
    });

    test("isInSameCol - bottom", () => {
      let location1 = {row: 5, col: 'c'}
      let location2 = {row: 3, col: 'c'}

      expect(functions.isInSameCol(location1,location2)).toBe(true);
    });

    test("isInSameCol - false", () => {
      let location1 = {row: 3, col: 'e'}
      let location2 = {row: 5, col: 'c'}

      expect(functions.isInSameCol(location1,location2)).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isInSameDiag - left top", () => {
      let location1 = {row: 3, col: 'd'}
      let location2 = {row: 5, col: 'b'}

      expect(functions.isInSameDiag(location1,location2)).toBe(true);
    });

    test("isInSameDiag - left bottom", () => {
      let location1 = {row: 3, col: 'd'}
      let location2 = {row: 2, col: 'c'}

      expect(functions.isInSameDiag(location1,location2)).toBe(true);
    });

    test("isInSameDiag - right top", () => {
      let location1 = {row: 3, col: 'd'}
      let location2 = {row: 7, col: 'h'}

      expect(functions.isInSameDiag(location1,location2)).toBe(true);
    });

    test("isInSameDiag - right bottom", () => {
      let location1 = {row: 3, col: 'd'}
      let location2 = {row: 1, col: 'f'}

      expect(functions.isInSameDiag(location1,location2)).toBe(true);
    });

    test("isInSameDiag - false", () => {
      let location1 = {row: 3, col: 'd'}
      let location2 = {row: 3, col: 'e'}

      expect(functions.isInSameDiag(location1,location2)).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("noPieceBetweenInRow - true", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'b'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenInRow(setup,setup[0].location,setup[2].location)).toBe(true);
    });

    test("noPieceBetweenInRow - false", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenInRow(setup,setup[0].location,setup[2].location)).toBe(false);
    });

    test("noPieceBetweenInRow - exception", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 3, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(() => functions.noPieceBetweenInRow(setup,setup[0].location,setup[2].location)).toThrow('The two locations are not in the same row!');
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("noPieceBetweenInCol - true", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 5, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenInCol(setup,setup[0].location,setup[2].location)).toBe(true);
    });

    test("noPieceBetweenInCol - false", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenInCol(setup,setup[0].location,setup[2].location)).toBe(false);
    });

    test("noPieceBetweenInCol - excepion", () => {
      let setup = [
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'e'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(() => functions.noPieceBetweenInCol(setup,setup[0].location,setup[2].location)).toThrow('The two locations are not in the same column!');
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("noPieceBetweenInDiag - true", () => {
      let setup = [
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 5, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenInDiag(setup,setup[0].location,setup[2].location)).toBe(true);
    });

    test("noPieceBetweenInDiag - false", () => {
      let setup = [
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 5, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(functions.noPieceBetweenInDiag(setup,setup[0].location,setup[2].location)).toBe(false);
    });

    test("noPieceBetweenInDiag - excepion", () => {
      let setup = [
        { location: {row: 3, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: 'g'}, pieceType: "pawn", isplayerPiece: false, isInGame: true }
      ];

      expect(() => functions.noPieceBetweenInDiag(setup,setup[0].location,setup[2].location)).toThrow('The two locations are not in the same diagonal!');
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

    test("wasPieceMoved - rook moves back to starting position", () => {
      let setup = [
        { location: {row: 1, col: "a"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
      ];

      let matchHistory = ["Ra5","Ra1"];

      expect(functions.wasPieceMoved(setup,0,matchHistory)).toBe(true);
    });

    test("wasPieceMoved - king moves back to starting position", () => {
      let setup = [
        { location: {row: 1, col: "a"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "b"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "c"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "d"}, pieceType: "queen", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "e"}, pieceType: "king", isplayerPiece: true, isInGame: true },
      ];

      let matchHistory = ["Kf2,Ke1"];

      expect(functions.wasPieceMoved(setup,4,matchHistory)).toBe(true);
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

    test("isValidAttackPawn - false - no enemy piece there", () => {
      let setup = [
        { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 2, col: 'd'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 5, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true}
      ];

      expect(functions.isValidAttackPawn(setup,0,{row: 3,col: 'd'})).toBe(false);
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
    test("isValidAtackMoveRook - true - right", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "rook", isplayerPiece: true, isInGame: true},
      ];

      expect(functions.isValidAttackMoveRook(setup,0,{"row": 4,"col": 'h'})).toBe(true);
    });

    test("isValidAtackMoveRook - true - left", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "rook", isplayerPiece: true, isInGame: true},
      ];

      expect(functions.isValidAttackMoveRook(setup,0,{"row": 4,"col": 'a'})).toBe(true);
    });

    test("isValidAtackMoveRook - true - top", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "rook", isplayerPiece: true, isInGame: true},
      ];

      expect(functions.isValidAttackMoveRook(setup,0,{"row": 8,"col": 'd'})).toBe(true);
    });

    test("isValidAtackMoveRook - true - bottom", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "rook", isplayerPiece: true, isInGame: true},
      ];

      expect(functions.isValidAttackMoveRook(setup,0,{"row": 1,"col": 'd'})).toBe(true);
    });

    test("isValidAtackMoveRook - true - piece not in way", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "rook", isplayerPiece: true, isInGame: true},
        { location: {row: 6, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveRook(setup,0,{"row": 1,"col": 'd'})).toBe(true);
    });

    test("isValidAtackMoveRook - false - diagonal", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "rook", isplayerPiece: true, isInGame: true},
      ];

      expect(functions.isValidAttackMoveRook(setup,0,{"row": 6,"col": 'f'})).toBe(false);
    });

    test("isValidAtackMoveRook - false - piece in way in row", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "rook", isplayerPiece: true, isInGame: true},
        { location: {row: 4, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveRook(setup,0,{"row": 4,"col": 'h'})).toBe(false);
    });

    test("isValidAtackMoveRook - false - piece in way in col", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "rook", isplayerPiece: true, isInGame: true},
        { location: {row: 6, col: 'd'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveRook(setup,0,{"row": 8,"col": 'd'})).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isValidAttackMoveKnight - true - enemy is there, 2 right 1 up", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "knight", isplayerPiece: true, isInGame: true},
        { location: {row: 5, col: 'f'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveKnight(setup,0,{"row": 5,"col": 'f'})).toBe(true);
    });

    test("isValidAttackMoveKnight - true - enemy is there, 2 down 1 left", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "knight", isplayerPiece: true, isInGame: true},
        { location: {row: 2, col: 'c'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveKnight(setup,0,{"row": 2,"col": 'c'})).toBe(true);
    });

    test("isValidAttackMoveKnight - true - enemy is not there, 2 down 1 left", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "knight", isplayerPiece: true, isInGame: true},
      ];

      expect(functions.isValidAttackMoveKnight(setup,0,{"row": 2,"col": 'c'})).toBe(true);
    });

    test("isValidAttackMoveKnight - true - jump over other pieces", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "knight", isplayerPiece: true, isInGame: true},
        { location: {row: 5, col: 'e'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 6, col: 'e'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveKnight(setup,0,{"row": 6,"col": 'e'})).toBe(true);
    });

    test("isValidAttackMoveKnight - false - enemy is there, 3 up", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "knight", isplayerPiece: true, isInGame: true},
        { location: {row: 7, col: 'c'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveKnight(setup,0,{"row": 7,"col": 'c'})).toBe(false);
    });

    test("isValidAttackMoveKnight - false - enemy is there, 1 right 1 bottom", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "knight", isplayerPiece: true, isInGame: true},
        { location: {row: 3, col: 'e'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveKnight(setup,0,{"row": 3,"col": 'e'})).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isValidAtackMoveBishop - true - enemy is there", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "bishop", isplayerPiece: true, isInGame: true},
        { location: {row: 7, col: 'a'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveBishop(setup,0,{"row": 7,"col": 'a'})).toBe(true);
    });

    test("isValidAtackMoveBishop - true - enemy is not there", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "bishop", isplayerPiece: true, isInGame: true},
        { location: {row: 7, col: 'a'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveBishop(setup,0,{"row": 1,"col": 'g'})).toBe(true);
    });

    test("isValidAtackMoveBishop - false - can't jump over pieces", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "bishop", isplayerPiece: true, isInGame: true},
        { location: {row: 6, col: 'b'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
        { location: {row: 7, col: 'a'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveBishop(setup,0,{"row": 7,"col": 'd'})).toBe(false);
    });

    test("isValidAtackMoveBishop - false - not a diagonal path", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "bishop", isplayerPiece: true, isInGame: true},
        { location: {row: 6, col: 'b'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
        { location: {row: 7, col: 'a'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveBishop(setup,0,{"row": 6,"col": 'd'})).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isValidAtackMoveQueen - true - diagonal path", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "queen", isplayerPiece: true, isInGame: true},
        { location: {row: 2, col: 'b'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveQueen(setup,0,{"row": 2,"col": 'b'})).toBe(true);
    });

    test("isValidAtackMoveQueen - true - axis path", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "queen", isplayerPiece: true, isInGame: true},
        { location: {row: 4, col: 'h'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveQueen(setup,0,{"row": 4,"col": 'h'})).toBe(true);
    });

    test("isValidAtackMoveQueen - false - can't jump over pieces", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "queen", isplayerPiece: true, isInGame: true},
        { location: {row: 4, col: 'f'}, pieceType: "pawn", isplayerPiece: true, isInGame: true},
        { location: {row: 4, col: 'h'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveQueen(setup,0,{"row": 4,"col": 'h'})).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isValidAtackMoveKing - true", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "king", isplayerPiece: true, isInGame: true},
        { location: {row: 5, col: 'e'}, pieceType: "pawn", isplayerPiece: false, isInGame: true},
      ];

      expect(functions.isValidAttackMoveKing(setup,0,{"row": 5,"col": 'e'})).toBe(true);
    });

    test("isValidAtackMoveKing - false - 2 cell move", () => {
      let setup = [
        { location: {row: 4, col: 'd'}, pieceType: "king", isplayerPiece: true, isInGame: true},
      ];

      expect(functions.isValidAttackMoveKing(setup,0,{"row": 2,"col": 'd'})).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isInCheck - true - black king", () => {
      let setup = [
        { location: {row: 1, col: "a"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "b"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "c"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: "a"}, pieceType: "queen", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "e"}, pieceType: "king", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "f"}, pieceType: "bishop", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: true },

        { location: {row: 2, col: "a"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "b"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: "c"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "d"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "e"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "f"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "g"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "h"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },

        { location: {row: 7, col: "a"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "b"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "c"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 4, col: "d"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "e"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "f"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "g"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "h"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },

        { location: {row: 8, col: "a"}, pieceType: "rook", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "b"}, pieceType: "knight", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "c"}, pieceType: "bishop", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "d"}, pieceType: "queen", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "e"}, pieceType: "king", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "f"}, pieceType: "bishop", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "g"}, pieceType: "knight", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "h"}, pieceType: "rook", isplayerPiece: false, isInGame: true }
      ];

      let matchHistory = ["c4","d5","Qa4+"]

      expect(functions.isInCheck(setup,false,matchHistory)).toBe(true);
    });

    test("isInCheck - false - black king", () => {
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
        { location: {row: 2, col: "b"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 4, col: "c"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "d"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "e"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "f"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "g"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },
        { location: {row: 2, col: "h"}, pieceType: "pawn", isplayerPiece: true, isInGame: true },

        { location: {row: 7, col: "a"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "b"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "c"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "d"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "e"}, pieceType: "pawn", isplayerPiece: false, isInGame: false },
        { location: {row: 7, col: "f"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "g"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },
        { location: {row: 7, col: "h"}, pieceType: "pawn", isplayerPiece: false, isInGame: true },

        { location: {row: 8, col: "a"}, pieceType: "rook", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "b"}, pieceType: "knight", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "c"}, pieceType: "bishop", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "d"}, pieceType: "queen", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "e"}, pieceType: "king", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "f"}, pieceType: "bishop", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "g"}, pieceType: "knight", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "h"}, pieceType: "rook", isplayerPiece: false, isInGame: true }
      ];

      let matchHistory = ["c4"]

      expect(functions.isInCheck(setup,true,matchHistory)).toBe(false);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    test("isValidSelection - true", () => {
      let setup = [
        { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
        { location: {row: 8, col: "d"}, pieceType: "queen", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "e"}, pieceType: "king", isplayerPiece: false, isInGame: true },
      ];

      expect(functions.isValidSelection(setup,{row:1,col:'h'})).toBe(true);
    });

    test("isValidSelection - false - piece at location is not in game", () => {
      let setup = [
        { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: false },
        { location: {row: 8, col: "d"}, pieceType: "queen", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "e"}, pieceType: "king", isplayerPiece: false, isInGame: true },
      ];

      expect(functions.isValidSelection(setup,{row:1,col:'h'})).toBe(false);
    });

    test("isValidSelection - false - piece at location is not player piece", () => {
      let setup = [
        { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
        { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
        { location: {row: 8, col: "d"}, pieceType: "queen", isplayerPiece: false, isInGame: true },
        { location: {row: 8, col: "e"}, pieceType: "king", isplayerPiece: false, isInGame: true },
      ];

      expect(functions.isValidSelection(setup,{row:8,col:'d'})).toBe(false);
    });
});


describe("ENDPOINT TESTS", () => {

  test("greeting /", async () => {
    let response = await request(app).get('/')

    expect(response.text).toBe('Welcome to my chess API :)')
  });

  test("get isValidSelection", async () => {

    let setup = JSON.stringify([
      { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
      { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
      { location: {row: 8, col: "d"}, pieceType: "queen", isplayerPiece: false, isInGame: true },
      { location: {row: 8, col: "e"}, pieceType: "king", isplayerPiece: false, isInGame: true },
    ]);
    let location = JSON.stringify({row:1,col:'h'})

    let response = await request(app).get("/isvalidselection/"+setup+"/"+location)
    expect(response.text).toBe('true')
  });

  test("get isValidMove", async () => {

    let setup = JSON.stringify([
      { location: {row: 1, col: "g"}, pieceType: "knight", isplayerPiece: true, isInGame: true },
      { location: {row: 1, col: "h"}, pieceType: "rook", isplayerPiece: true, isInGame: true },
      { location: {row: 8, col: "d"}, pieceType: "queen", isplayerPiece: false, isInGame: true },
      { location: {row: 8, col: "e"}, pieceType: "king", isplayerPiece: false, isInGame: true },
    ]);
    let index = JSON.stringify(1)
    let newLocation = JSON.stringify({row:5,col:'h'})
    let matchHistory = JSON.stringify([])

    let response = await request(app).get("/isvalidmove/"+setup+"/"+index+"/"+newLocation+"/"+matchHistory)
    expect(response.text).toBe('true')

  })
});