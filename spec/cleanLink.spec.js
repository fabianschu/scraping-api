const {cleanLink} = require('../services/cleanLink');

describe("The cleanLink function", () => {
    it("is a function", () => {
        expect(typeof cleanLink).toEqual("function")
    })
    it("passes through a complete link", () => {
        expect(cleanLink("https://www.codacy.com", "https://www.codacy.com/terms")).toEqual("https://www.codacy.com/terms")
    })
    it("returns the correct link for a url that starts with a slash", () => {
        expect(cleanLink("https://www.codacy.com", "/terms")).toEqual("https://www.codacy.com/terms")
    })
})