const {isSubdomain} = require('../services/isSubdomain');

describe("the isSubdomain function", () => {
    it("is a function", () => {
        expect(typeof isSubdomain).toEqual("function");
    })
    it("returns false for http://example.com/", () => {
        expect(isSubdomain("http://example.com/")).toEqual(false);
    })
    it("returns false for http://www.example.com/", () => {
        expect(isSubdomain("http://www.example.com/")).toEqual(false);
    })
    it("returns true for http://snop.blob.example.com/", () => {
        expect(isSubdomain("http://snop.blob.example.com/")).toEqual(true);
    })
    it("returns false for www.example.com/", () => {
        expect(isSubdomain("www.example.com/")).toEqual(false);
    })
    it("returns the right result for www.example.com", () => {
        expect(isSubdomain("www.example.com")).toEqual(false);
    })
    it("returns the right result for example.com", () => {
        expect(isSubdomain("example.com")).toEqual(false);
    })
})