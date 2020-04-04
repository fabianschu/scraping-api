var express = require('express');
var router = express.Router();
const {getLinks} = require('../services/getLinks');
const {Queue} = require('../services/queue');

router.get('/*', async (req, res) => {
    const url = req.params[0];

    // get all links on page
    try {
        const linkObject = await getLinks(url);
        let internalLinks = Array.from(linkObject.internal);
        let store = [];
        let broken = [];
        let q = new Queue();
        internalLinks.forEach(el => q.enqueue(el));
        let visited = new Set();

        while (q.size) {
            let link = q.dequeue();
            if (!visited.has(link)){
                visited.add(link);
                if (link[0] === '/') {
                    link = url.substring(0, url.length - 1) + link;
                }
                try {
                    //TODO: exclude PDFs
                    console.log(link);
                    let newLinkObject = await getLinks(link);
                    for (el of newLinkObject.internal) {
                        q.enqueue(el);
                    }
                    store.push(link);
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

module.exports = router;