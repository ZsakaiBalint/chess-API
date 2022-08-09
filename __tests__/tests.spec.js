var functions = require("../functions"); 

describe("Testing", () => {
    test("addTwo function test", () => {
      const input = 1 + 2;
    
      const output = functions.addTwo(1,2);
  
      expect(input).toEqual(output);
  
    });
  });