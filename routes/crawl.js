var express = require('express');
var router = express.Router();
const {getLinks} = require('../services/getLinks');
const {isException} = require('../services/isException');
const {cleanLink} = require('../services/cleanLink');
const {isSubdomain} = require('../services/isSubdomain');
const {Queue} = require('../services/queue');

const neo4j = require('neo4j-driver');

router.get('/*', async (req, res) => {
    const url = req.params[0];

    // get all links on page
    try {
        const linkObject = await getLinks(url);
        let internalLinks = Array.from(linkObject.internal);
        let q = new Queue();
        let visited = new Set();
        let store = [];
        let broken = [];

        internalLinks.forEach(el => q.enqueue(el));

        while (q.size) {
            let link = q.dequeue();
            console.log('original link: ', link)
            if (!visited.has(link)){
                console.log('link not yet visited')
                visited.add(link);
                link = cleanLink(url, link);
                try {
                    //TODO: exclude PDFs
                    console.log('2: ', link);
                    if(!isException(link)) {
                        console.log("get new shit")
                        let newLinkObject = await getLinks(link);
                        for (el of newLinkObject.internal) {
                            q.enqueue(el);
                        }
                        store.push(link);
                    }
                } catch (err) {
                    broken.push(link);
                    console.log(err)
                }
            }
        }
        res.json({
            functional: store,
            broken
        });
    } catch (err) {
        console.log(err);
    }
});

router.post('/*', (req, res) => {
    res.send('hi knucklehead')
})

module.exports = router;