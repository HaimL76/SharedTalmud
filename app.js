const express = require('express')
const app = express()
const port = 3000

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
    var sql = require("mssql");

    const Connection = require('tedious').Connection;

    var connection = new Connection(config);

    connection.on('connect', function(err) {
        // If no error, then good to proceed.  
        if (err)
            console.log(JSON.stringify(err))

        executeStatement1(connection);
    });

    connection.connect();
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
    const Request = require('tedious').Request

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