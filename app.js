const express = require('express')
const dtu = require('./dateTimeUtils.js')
const app = express()
const port = 3000

const Request = require('tedious').Request
const Connection = require('tedious').Connection;
var ConnectionPool = require('tedious-connection-pool');

const config = {
    server: "localhost",
    authentication: {
        type: "default",
        options: {
            userName: "sa",
            password: "sa",
        }
    },
    database: "SharedTalmud"
};

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    console.log(`get ${dtu.formatDateTime(new Date())}`);

    const connection = new Connection(config);

    connection.on('connect', (err) => {
        console.log("it's connected!");

        connection.execSql(request);
    });
});

app.post('/:row/:col', (req, res) => {
    if (req && 'params' in req)
        console.log(JSON.stringify(req.params));

    const { row, col } = req.params;

    var sql = require("mssql");

    const Connection = require('tedious').Connection;

    var connection = new Connection(config);

    connection.on('connect', function(err) {
        // If no error, then good to proceed.  
        if (err)
            console.log(JSON.stringify(err));

        console.log(row);
        console.log(col);

        executeStatement1(connection, row, col);
    });

    connection.connect();
});


function executeStatement1(connection, row, col) {
    const sql = `insert into [SharedTalmud].[dbo].[Comments] (ResId, Row, Col) values(1, ${row}, ${col});`

    console.log(sql);

    request = new Request(sql, function(err) {
        if (err)
            console.log(JSON.stringify(err));
    });

    request.on("requestCompleted", function(rowCount, more) {
        connection.close();
    });

    connection.execSql(request);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});