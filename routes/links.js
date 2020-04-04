var express = require('express');
var router = express.Router();
const {getLinks} = require('../services/getLinks');

router.get('/*', async (req, res) => {
    const url = req.params[0];
    getLinks(url)
        .then(response => {
            response.internal = Array.from(response.internal);
            response.external = Array.from(response.external);
            res.json(response);
        })
        .catch(err => console.log(err));
});

module.exports = router;