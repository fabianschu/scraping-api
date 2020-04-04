const got = require('got');
const express = require('express');
const app = express();
//const logger = require("morgan");
const links = require('./routes/links');
const crawl = require('./routes/crawl');
const logger = require("morgan");

app.use(logger("dev"));

app.get('/', function (req, res) {
    return res.send('Hello world');
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
