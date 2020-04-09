const {getLinks} = require("../services/getLinks");

describe("the getLinks function", () => {
    it("is a function", () => {
        expect(typeof getLinks).toEqual("function");
    })
    it("returns one external link for example.com", async () => {
        const result = await getLinks("http://example.com/")
        expect(result.external.size).toEqual(1);
        expect(result.internal.size).toEqual(0);
    })
})