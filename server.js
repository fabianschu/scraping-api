const got = require('got');
const express = require('express');
const app = express();
const links = require('./routes/links');
const crawl = require('./routes/crawl');
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require('path');

const neo4j = require('neo4j-driver');

app.use(logger("dev"));

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '123456'));
const session = driver.session();

app.get('/', (req, res) => {
    session
        .run("MATCH(n:Movie) RETURN n LIMIT 25")
        .then(response => {
            const movieArray = 
            response.records.map(record => {
                return {
                    id: record._fields[0].identity.low,
                    title: record._fields[0].properties.title
                }
            })
            return res.json(movieArray);
        })
        .catch(err => console.log(err))
    //return res.send('Hello world');
});

app.listen(process.env.PORT || 5000, () => console.log('listening on port '));

app.use("/links", links);

app.use("/crawl", crawl);

// (async () => {
//     const rnd = Math.round(Math.random());
//     let request = got('https://sindresorhus.com');
//     //console.log(request);
//     if (rnd === 0) {
//         console.log("cancel request")
//         request.cancel();
//         console.log("request cancelled")
//     }
//     try {
//         await request;
//         //console.log(request);
//     } catch (error) {
//         if (request.isCanceled) { // Or `error instanceof got.CancelError`
//             // Handle cancelation
//             console.log('request was cancelled');
//         }
//     }
// })()
