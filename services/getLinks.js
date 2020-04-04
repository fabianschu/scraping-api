const got = require('got');
const cheerio = require('cheerio');

const getLinks = async (url) => {
    let linkObject = {
        internal: new Set(),
        external: new Set()
    };
    let response = await got(url);
    const html = response;
    const $ = cheerio.load(html.body);
    let links = $('a');
    $(links).each((i, link) => {
        const href = $(link).attr('href');
        if (href) {
            if (href.includes('dampsoft.de') || href[0] === "/") {
                linkObject.internal.add(href);
            } else {
                linkObject.external.add(href);
            }
        }
    })
    return linkObject;
}

module.exports.getLinks = getLinks;