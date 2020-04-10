const got = require('got');

got("http://localhost:7474/db/neo4j/tx")
.then(res => console.log(res))
.catch(err => console.log(err))