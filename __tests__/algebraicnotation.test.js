const functions = require("../chessboard/algebraicnotation");

describe("Algebraic notation tests", () => {

    describe("isValidNotation function", () => {

        test("miscellaneous", () => {
            let notation1 = "1-0";
            let notation2 = "0-1";
            let notation3 = "½–½";
            let notation4 = "0-0";
            let notation5 = "0-0-0";

            expect(functions.AlgebraicNotation.isValidNotation(notation1)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation2)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation3)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation4)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation5)).toBe(true);
        })

        test("pawn basic moves", () => {
            let notation1 = "d4";
            let notation2 = "d4+";
            let notation3 = "d4#";

            let notation4 = "xd4";
            let notation5 = "xd4+";
            let notation6 = "xd4#";

            let notation7 = "cxd4";
            let notation8 = "cxd4+";
            let notation9 = "cxd4#";

            let notation10 = "hxd4#";

            expect(functions.AlgebraicNotation.isValidNotation(notation1)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation2)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation3)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation4)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation5)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation6)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation7)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation8)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation9)).toBe(true);

            expect(functions.AlgebraicNotation.isValidNotation(notation10)).toBe(false);
        });

        test("pawn promotions", () => {
            let notation1 = "c8Q";
            let notation2 = "c8Q+";
            let notation3 = "c8Q#";

            let notation4 = "xc8Q";
            let notation5 = "xc8Q+";
            let notation6 = "xc8Q#";

            let notation7 = "dxc8Q";
            let notation8 = "dxc8Q+";
            let notation9 = "dxc8Q#";

            let notation10 = "axc8Q#";

            expect(functions.AlgebraicNotation.isValidNotation(notation1)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation2)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation3)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation4)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation5)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation6)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation7)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation8)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation9)).toBe(true);

            expect(functions.AlgebraicNotation.isValidNotation(notation10)).toBe(false);
        });

        test("rook moves", () => {
            let notation1 = "Rb4";
            let notation2 = "Rb4+";
            let notation3 = "Rb4#";

            let notation4 = "Rxb4";
            let notation5 = "Rxb4+";
            let notation6 = "Rxb4#";

            let notation7 = "R2xb4";
            let notation8 = "R2xb4+";
            let notation9 = "R2xb4#";

            let notation10 = "Rhxb4";
            let notation11 = "Rhxb4+";
            let notation12 = "Rhxb4#";

            let notation13 = "Rh3xb4#";

            expect(functions.AlgebraicNotation.isValidNotation(notation1)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation2)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation3)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation4)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation5)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation6)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation7)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation8)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation9)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation10)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation11)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation12)).toBe(true);

            expect(functions.AlgebraicNotation.isValidNotation(notation13)).toBe(false);
        })

        test("knight moves", () => {
            let notation1 = "Nb4";
            let notation2 = "Nb4+";
            let notation3 = "Nb4#";

            let notation4 = "Nxb4";
            let notation5 = "Nxb4+";
            let notation6 = "Nxb4#";

            let notation7 = "Naxb4";
            let notation8 = "Naxb4+";
            let notation9 = "Naxb4#";

            let notation10 = "N5xb4";
            let notation11 = "N5xb4+";
            let notation12 = "N5xb4#";

            let notation13 = "Nd5xb4";
            let notation14 = "Nd5xb4+";
            let notation15 = "Nd5xb4#";

            let notation16 = "Nh5xb4";

            expect(functions.AlgebraicNotation.isValidNotation(notation1)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation2)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation3)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation4)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation5)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation6)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation7)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation8)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation9)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation10)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation11)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation12)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation13)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation14)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation15)).toBe(true);

            expect(functions.AlgebraicNotation.isValidNotation(notation16)).toBe(false);
        })

        test("bishop moves", () => {
            let notation1 = "Bb4";
            let notation2 = "Bb4+";
            let notation3 = "Bb4#";

            let notation4 = "Bxb4";
            let notation5 = "Bxb4+";
            let notation6 = "Bxb4#";

            let notation7 = "Baxb4";
            let notation8 = "Baxb4+";
            let notation9 = "Baxb4#";

            let notation10 = "B5xb4";
            let notation11 = "B5xb4+";
            let notation12 = "B5xb4#";

            let notation13 = "Bc3xe5";
            let notation14 = "Bc3xe5+";
            let notation15 = "Bc3xe5#";

            let notation16 = "Bc4xe5";

            expect(functions.AlgebraicNotation.isValidNotation(notation1)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation2)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation3)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation4)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation5)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation6)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation7)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation8)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation9)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation10)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation11)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation12)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation13)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation14)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation15)).toBe(true);

            expect(functions.AlgebraicNotation.isValidNotation(notation16)).toBe(false);
        })

        test("queen moves", () => {
            let notation1 = "Qb4";
            let notation2 = "Qb4+";
            let notation3 = "Qb4#";

            let notation4 = "Qxb4";
            let notation5 = "Qxb4+";
            let notation6 = "Qxb4#";

            let notation7 = "Qaxb4";
            let notation8 = "Qaxb4+";
            let notation9 = "Qaxb4#";

            let notation10 = "Q5xb4";
            let notation11 = "Q5xb4+";
            let notation12 = "Q5xb4#";

            let notation13 = "Qc3xe5";
            let notation14 = "Qc3xe5+";
            let notation15 = "Qc3xe5#";

            let notation16 = "Qc4xe5";

            expect(functions.AlgebraicNotation.isValidNotation(notation1)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation2)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation3)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation4)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation5)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation6)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation7)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation8)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation9)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation10)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation11)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation12)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation13)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation14)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation15)).toBe(true);

            expect(functions.AlgebraicNotation.isValidNotation(notation16)).toBe(false);
        })

        test("king moves", () => {
            let notation1 = "Kb4";
            let notation2 = "Kb4+";
            let notation3 = "Kb4#";

            let notation4 = "Kxb4";
            let notation5 = "Kxb4+";
            let notation6 = "Kxb4#";

            let notation7 = "Kc3xb4";

            expect(functions.AlgebraicNotation.isValidNotation(notation1)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation2)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation3)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation4)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation5)).toBe(true);
            expect(functions.AlgebraicNotation.isValidNotation(notation6)).toBe(true);

            expect(functions.AlgebraicNotation.isValidNotation(notation7)).toBe(false);
        })
    })

    describe("isValidMatchHistory", () => {
        let matchHistory = [
            "1. b3 e5",
            "2. d3 h5",
            "3. Nf3 Qf6",
            "4. h3 d5",
            "5. g4 a6",
            "6. gxh5 Rxh5",
            "7. c3 Kd7",
            "8. b4 Ke7",
            "9. Ba3 Bd7",
            "10. b5+ Ke8",
            "11. bxa6 Qb6",
            "12. axb7 Qxb7",
            "13. d4 Ra7",
            "14. dxe5 c5",
            "15. e3 Bf5",
            "16. Ng1 Nh6",
            "17. Be2 Nd7",
            "18. Bxh5 Ra8",
            "19. Bc1 Ng8",
            "20. Bf3 Ke7",
            "21. Bxd5 Nxe5",
            "22. Bxb7 Bh7",
            "23. Bxa8 Nh6",
            "24. Ba3 Bg6",
            "25. Bxc5+ Ke6",
            "26. Bxf8 Nc4",
            "27. Bd5+ Kd7",
            "28. Bxc4+ Ke8",
            "29. Bxg7 Bf5",
            "30. Bxh6 Be4",
            "31. Bb5+ Ke7",
            "32. Bg5+ Kf8",
            "33. Bc4 Bxh1",
            "34. Qg4 Kg8",
            "35. Bf6+ Kh7",
            "36. Bxf7 Bb7",
            "37. Bg8+ Kh6",
            "38. Qg5# 1-0",
        ];

        expect(functions.AlgebraicNotation.isValidMatchHistory(matchHistory)).toBe(true);
    })

    describe("getPlayerHistory", () => {
        let matchHistory = [
            "1. b3 e5",
            "2. d3 h5",
            "3. Nf3 Qf6",
            "4. h3 d5",
            "5. g4 a6",
            "6. gxh5 Rxh5",
            "7. c3 Kd7",
            "8. b4 Ke7",
            "9. Ba3 Bd7",
            "10. b5+ Ke8",
            "11. bxa6 Qb6",
            "12. axb7 Qxb7",
            "13. d4"
        ];

        expect(functions.AlgebraicNotation.getPlayerHistory(matchHistory)).toStrictEqual(["b3","d3","Nf3","h3","g4","gxh5",
        "c3","b4","Ba3","b5+","bxa6","axb7","d4"]);
    })

    describe("getEnemyHistory", () => {
        let matchHistory = [
            "1. b3 e5",
            "2. d3 h5",
            "3. Nf3 Qf6",
            "4. h3 d5",
            "5. g4 a6",
            "6. gxh5 Rxh5",
            "7. c3 Kd7",
            "8. b4 Ke7",
            "9. Ba3 Bd7",
            "10. b5+ Ke8",
            "11. bxa6 Qb6",
            "12. axb7 Qxb7",
            "13. d4"
        ];

        expect(functions.AlgebraicNotation.getEnemyHistory(matchHistory)).toStrictEqual(["e5","h5","Qf6","d5","a6","Rxh5",
        "Kd7","Ke7","Bd7","Ke8","Qb6","Qxb7"]);
    })
    
})