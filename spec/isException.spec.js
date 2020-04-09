const {isException} = require('../services/isException');

describe("the isException function", () => {
    it("is a function", () => {
        expect(typeof isException).toEqual("function");
    })
    it("returns true for pdfs", () => {
        expect(isException("https://www.codacy.com/terms.pdf")).toEqual(true);
    })
    it("returns true for jpgs", () => {
        expect(isException("https://www.codacy.com/terms.jpg")).toEqual(true);
    })
})