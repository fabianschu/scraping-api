const {extractDomain} = require('../services/extractDomain');

describe("the extractDomain function", () => {
    it("is a function", () => {
        expect(typeof extractDomain).toEqual("function");
    })
    it("returns the right result for http://example.com/", () => {
        expect(extractDomain("http://example.com/")).toEqual("example.com");
    })
    it("returns the right result for http://www.example.com/", () => {
        expect(extractDomain("http://www.example.com/")).toEqual("example.com");
    })
    it("returns the right result for http://www.example.com/", () => {
        expect(extractDomain("http://snop.blob.example.com/")).toEqual("example.com");
    })
    it("returns the right result for www.example.com/", () => {
        expect(extractDomain("www.example.com/")).toEqual("example.com");
    })
    it("returns the right result for www.example.com", () => {
        expect(extractDomain("www.example.com")).toEqual("example.com");
    })
    it("returns the right result for example.com", () => {
        expect(extractDomain("example.com")).toEqual("example.com");
    })
})