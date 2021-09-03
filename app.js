const express = require('express')
const app = express()
const port = 3000

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    var sql = require("mssql");

    var Connection = require('tedious').Connection;

    // config for your database
    var config = {
        user: 'sa',
        password: 'sa',
        server: 'localhost',
        database: 'SharedTalmud'
    };

    var connection = new Connection(config);

    //console.log(JSON.stringify(connection));

    connection.on('connect', function(err) {
        // If no error, then good to proceed.  

        executeStatement1(connection);
    });

    connection.connect();
});

function executeStatement1(connection) {
    var Request = require('tedious').Request

    request = new Request("insert into SharedTalmud.Comments (ResId, Row, Col) values(1, 1, 1);", function(err) {
        if (err) {
            console.log(err);
        }
    });

    request.on("requestCompleted", function(rowCount, more) {
        connection.close();
    });

    connection.execSql(request);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});