var express = require('express');
var router = express.Router();
const {getLinks} = require('../services/getLinks');

router.get('/*', async (req, res) => {
    const url = req.params[0];

    // get all links on page
    try {
        const linkObject = await getLinks(url);
        let internalLinks = linkObject.internal;
        let visited = new Set();
        //console.log(internalLinks);
        // internalLinks.forEach(async (link) => {
        for (link of internalLinks) {
            console.log('size of internal links: ', internalLinks.size);
            if(!visited.has(link)) {
                try {
                    let modLink = link;
                    console.log('visiting: ', modLink);
                    if (link[0] === '/') {
                        modLink = url.substring(0,url.length) + link;
                    }
                    console.log('modLink: ', modLink);
                    let newLinkObject = await getLinks(modLink);
                    let newLinks = newLinkObject.internal;
                    //console.log(newLinkObject);
                    newLinks.forEach(el => internalLinks.add(el));
                    console.log(internalLinks.size);
                    visited.add(link);
                } catch (err) {
                    console.log(err)
                }
            }
        }
        console.log('done');
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;