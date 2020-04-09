const {isInternal} = require('../services/isInternal');

describe("the isInternal function", () => {
    it("is a function", () => {
        expect(typeof isInternal).toEqual("function");
    })
    it("returns true for the standard case", () => {
        expect(isInternal("https://www.codacy.com/", "https://www.codacy.com/terms")).toEqual(true);
    })
    it("returns false for subdomains", () => {
        expect(isInternal("https://www.codacy.com/", "https://app.codacy.com/terms")).toEqual(false);
    })
    it("returns false for overlapping domains", () => {
        expect(isInternal("https://www.codacy.com/", "https://akademie-codacy.com/terms")).toEqual(false);
    })
    it("returns false for external links (e.g.linkedin", () => {
        expect(isInternal("https://www.codacy.com/", "https://linkedin.com/shareArticle?mini=true&title=PRAXIS%20%26%20STELLENPORTAL&url=https://www.dampsoft.de/telematikinfrastruktur-ja-und-2/")).toEqual(false);
    })
})