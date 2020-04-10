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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

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
            console.log('DRIVER RESULTS: ', movieArray);
            //return res.json(movieArray);
        })
        .catch(err => console.log(err))
    //return res.send('Hello world');
});

app.post('/', (req, res) => {
    const title = req.body.title;
    const year = req.body.year;
    session
        // .run(`CREATE (n:Movie {title:"${title}"}) RETURN n.title`)
        .run('CREATE (n:Movie {title:$titleParam, year:$yearParam}) RETURN n.title', {titleParam: title, yearParam: year})
        // .run("CREATE (TheDaVinciCode:Movie {title:'The Da Vinci asdfasgasg', released:2006, tagline:'Break The Codes'})")
        .then(result => session.close())
        .catch(err => console.log(err))
})

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
