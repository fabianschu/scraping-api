const got = require('got');
const cheerio = require('cheerio');
const {extractDomain} = require('../services/extractDomain');
const {isSubdomain} = require('../services/isSubdomain');
const {isInternal} = require('../services/isInternal');

const getLinks = async (url) => {
    let linkObject = {
        internal: new Set(),
        subdomain: new Set(),
        external: new Set(),
    };
    let response = await got(url);
    const html = response;
    const $ = cheerio.load(html.body);
    const domain = extractDomain(url);

    let links = $('a');
    $(links).each((i, link) => {
        const href = $(link).attr('href');
        if (href) {
            if (isSubdomain(href)) {
                linkObject.subdomain.add(href);
            }  else if (isInternal(domain, href)) {
                linkObject.internal.add(href);
            } else {
                linkObject.external.add(href);
            }
        }
    })
    return linkObject;
}

module.exports.getLinks = getLinks;