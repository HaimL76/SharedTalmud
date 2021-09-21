const express = require('express')
const dtu = require('./dateTimeUtils.js')
const utils = require('./Utils.js')
const app = express()

const bodyParser = require("body-parser");

// Parse URL-encoded bodies (as sent by HTML forms)
//app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json({ type: '*/*' }));

const port = 3000

const Database = "SharedTalmud";
const TableComments = `[${Database}].[dbo].[Comments]`;
const TableAuthors = `[${Database}].[dbo].[Authors]`;

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

app.get('/comments', async(req, res) => {
    const arr = await getComments();

    if (Array.isArray(arr))
        utils.log(`arr.length=${arr.length}`);

    res.send(arr);
});

const getComments = () => {
    return new Promise((resolve, reject) => {
        const strDateTime = dtu.formatDateTime(new Date());

        const connection = new Connection(config);

        connection.on('connect', (err) => {
            utils.log(`${strDateTime}, connected `);

            const sql = `select c.[Id], c.[Resource], c.[Row], c.[Col], a.[First], a.[Last] ` +
                ` from ${TableComments} c inner join ${TableAuthors} a on a.[Id] = c.[Author]`

            request = new Request(sql, function(err, rowCount) {
                if (err) {
                    utils.log(err, 1);
                } else {
                    //utils.log(rowCount + ' rows');
                }
            });

            const arr = [];

            request.on('row', function(cols) {
                //if (Array.isArray(cols))
                //  utils.log(`cols.length = ${cols.length}`);

                const arr0 = [];

                cols.forEach((col) => {
                    //utils.log(`${strDateTime}, ${col.value}`);
                    arr0.push(col.value)
                });

                arr.push(arr0);
            });

            request.on('requestCompleted', function() {
                connection.close();

                resolve(arr);
            });

            request.on('done', function(rowCount, more, rows) {
                //utils.log(rowCount);
                const arr = [];

                rows.forEach((row) => {
                    //utils.log(`${strDateTime}, ${row.value}`);
                    arr.push(row.value)
                });

                resolve(arr);
            });

            connection.execSql(request);

            utils.log(`${strDateTime}, after calling exeSql`);
        });

        connection.connect();

        utils.log(`${strDateTime}, after calling connect`);
    });
}

app.post('/comments', async(req, res) => {
    if (req) {
        //let isValid = utils.validateObject(req, ["body"]);

        //utils.log(`isValid = ${isValid}`, 1);

        //isValid = isValid && utils.validateObject(req.body, ["resId", "row", "col"]);

        //utils.log(`isValid = ${isValid}`, 1);

        const col = req.body.col;
        const row = req.body.row;
        const resId = req.body.resId;
        const text = req.body.text;
        const authorId = req.body.authorId;

        utils.log(`resId = ${resId}`);
        utils.log(`col = ${col}`);
        utils.log(`row = ${row}`);
        utils.log(`text = ${text}`);
        utils.log(`authorId = ${authorId}`);

        var result = await insertComment(authorId, resId, row, col, text);
    }

    res.send(result);
});

const insertComment = (authorId, resId, row, col, text) => {
    return new Promise((resolve, reject) => {
        var sql = require("mssql");

        const Connection = require('tedious').Connection;

        var connection = new Connection(config);

        connection.on('connect', function(err) {
            // If no error, then good to proceed.  
            if (err)
                utils.log(JSON.stringify(err));

            utils.log(row);
            utils.log(col);

            iRow = ~~row;
            iCol = ~~col;

            utils.log(iRow);
            utils.log(iCol);

            const sql = `insert into [SharedTalmud].[dbo].[Comments] (Author, Resource, Row, Col, Text, Headline) values(${authorId}, ${resId}, ${iRow}, ${iCol}, '${text}', '${text}')`;

            utils.log(sql, 1);

            request = new Request(sql, function(err) {
                if (err)
                    utils.log(JSON.stringify(err), 1);
            });

            request.on("requestCompleted", function(rowCount, more) {
                connection.close();

                resolve(more);
            });

            connection.execSql(request);
        });

        connection.connect();
    });
}

app.listen(port, () => {
    utils.log(`Example app listening at http: //localhost:${port}`)
});