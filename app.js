const express = require('express')
const dtu = require('./dateTimeUtils.js')
const utils = require('./Utils.js')
const sha256Module = require('./sha256.js')
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
const TableAuthorKinds = `[${Database}].[dbo].[AuthorKinds]`;
const TableCategories = `[${Database}].[dbo].[Categories]`;
const TableBooks = `[${Database}].[dbo].[Books]`;
const TableResources = `[${Database}].[dbo].[Resources]`;
const TableUsers = `[${Database}].[dbo].[Users]`;
const TablePersons = `[${Database}].[dbo].[Persons]`;

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

app.get('/comments/:resource', async(req, res) => {
    if (req && "params" in req && req.params && "resource" in req.params && req.params.resource > 0) {
        const arr = await getComments(req.params.resource);

        if (Array.isArray(arr))
            utils.log(`arr.length=${arr.length}`);

        res.send(arr);
    }
});

app.get('/users/:userId', async(req, res) => {
    if (req && "params" in req && req.params && "userId" in req.params && req.params.userId > 0) {
        const arr = await getUser(req.params.userId);

        if (Array.isArray(arr))
            utils.log(`arr.length=${arr.length}`);

        res.send(arr);
    }
});

app.get('/comments/byid/:id', async(req, res) => {
    if (req && "params" in req && req.params && "id" in req.params && req.params.id > 0) {
        const arr = await getComment(req.params.id);

        if (Array.isArray(arr))
            utils.log(`arr.length=${arr.length}`);

        res.send(arr);
    }
});

app.get('/categories', async(req, res) => {
    const arr = await getCategories();

    if (Array.isArray(arr))
        utils.log(`arr.length=${arr.length}`);

    res.send(arr);
});

app.get('/books/:category', async(req, res) => {
    var cat = req.params.category

    if (cat) {
        const arr = await getBooks(cat);

        if (Array.isArray(arr))
            utils.log(`arr.length=${arr.length}`);

        res.send(arr);
    }
});

app.get('/resources/:book', async(req, res) => {
    var cat = req.params.book

    if (cat) {
        const arr = await getResources(cat);

        if (Array.isArray(arr))
            utils.log(`arr.length=${arr.length}`);

        res.send(arr);
    }
});

app.get('/authorkinds', async(req, res) => {
    const arr = await getAuthorKinds();

    if (Array.isArray(arr))
        utils.log(`arr.length=${arr.length}`);

    res.send(arr);
});

const getComment = (id) => {
    if (id > 0)
        return new Promise((resolve, reject) => {
            const strDateTime = dtu.formatDateTime(new Date());

            const connection = new Connection(config);

            connection.on('connect', (err) => {
                utils.log(`${strDateTime}, connected `);

                const sql = `select c.[text] from ${TableComments} c where c.[Id] = ${id}`;

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

const getUser = (userId) => {
    if (userId > 0)
        return new Promise((resolve, reject) => {
            const strDateTime = dtu.formatDateTime(new Date());

            const connection = new Connection(config);

            connection.on('connect', (err) => {
                utils.log(`${strDateTime}, connected `);

                const sql = `select u.[Username]
                     from ${TableUsers} u inner join ${TablePersons} p on p.Id = u.PersonId
                     left outer join ${TableAuthors} a on a.[Id] = u.[AuthorId] 
                     where u.[Id] = ${userId}`

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

                let user = null;

                request.on('requestCompleted', function() {
                    connection.close();

                    if (Array.isArray(arr) && arr.length == 1)
                        user = arr[0];

                    resolve(user);
                });

                request.on('done', function(rowCount, more, rows) {
                    //utils.log(rowCount);
                    const arr = [];

                    rows.forEach((row) => {
                        //utils.log(`${strDateTime}, ${row.value}`);
                        arr.push(row.value)
                    });

                    if (Array.isArray(arr) && arr.length == 1)
                        user = arr[0];

                    resolve(user);
                });

                connection.execSql(request);

                utils.log(`${strDateTime}, after calling exeSql`);
            });

            connection.connect();

            utils.log(`${strDateTime}, after calling connect`);
        });
}

const getComments = (resource) => {
    if (resource > 0)
        return new Promise((resolve, reject) => {
            const strDateTime = dtu.formatDateTime(new Date());

            const connection = new Connection(config);

            connection.on('connect', (err) => {
                utils.log(`${strDateTime}, connected `);

                const sql = `select c.[Id], c.[Resource], c.[Row], c.[Col], a.[AuthorKind], a.[First], a.[Last] ` +
                    ` from ${TableComments} c inner join ${TableAuthors} a on a.[Id] = c.[Author] ` +
                    ` where resource = ${resource}`

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

const getCategories = () => {
    return new Promise((resolve, reject) => {
        const strDateTime = dtu.formatDateTime(new Date());

        const connection = new Connection(config);

        connection.on('connect', (err) => {
            utils.log(`${strDateTime}, connected `);

            const sql = `select cat.[Id], cat.[Name] ` +
                ` from ${TableCategories} cat`

            request = new Request(sql, function(err, rowCount) {
                if (err) {
                    utils.log(err, 1);
                } else {
                    //utils.log(rowCount + ' rows');
                }
            });

            const arr = [];

            request.on('row', function(cols) {
                const dict = {};

                cols.forEach((col) => dict[col.metadata.colName] = col.value);

                arr.push(dict);
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

const getAuthorKinds = () => {
    return new Promise((resolve, reject) => {
        const strDateTime = dtu.formatDateTime(new Date());

        const connection = new Connection(config);

        connection.on('connect', (err) => {
            utils.log(`${strDateTime}, connected `);

            let sql = `select ak.[Id], ak.[Name] ` +
                ` from ${TableAuthorKinds} ak`;

            //utils.log(sql, 1);

            request = new Request(sql, function(err, rowCount) {
                if (err) {
                    utils.log(err, 1);
                } else {
                    //utils.log(rowCount + ' rows');
                }
            });

            const arr = [];

            request.on('row', function(cols) {
                const dict = {};

                cols.forEach((col) => dict[col.metadata.colName] = col.value);

                arr.push(dict);
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

const getBooks = (category) => {
    return new Promise((resolve, reject) => {
        const strDateTime = dtu.formatDateTime(new Date());

        const connection = new Connection(config);

        connection.on('connect', (err) => {
            utils.log(`${strDateTime}, connected `);

            let sql = `select b.[Id], b.[Name] ` +
                ` from ${TableBooks} b`;

            if (category)
                sql += ` where b.[Category] = ${category}`

            utils.log(sql, 1);

            request = new Request(sql, function(err, rowCount) {
                if (err) {
                    utils.log(err, 1);
                } else {
                    //utils.log(rowCount + ' rows');
                }
            });

            const arr = [];

            request.on('row', function(cols) {
                const dict = {};

                cols.forEach((col) => dict[col.metadata.colName] = col.value);

                arr.push(dict);
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

const getResources = (book) => {
    return new Promise((resolve, reject) => {
        const strDateTime = dtu.formatDateTime(new Date());

        const connection = new Connection(config);

        connection.on('connect', (err) => {
            utils.log(`${strDateTime}, connected `);

            let sql = `select r.[Id], r.[Page], r.[Path] ` +
                ` from ${TableResources} r`;

            if (book)
                sql += ` where r.[Book] = ${book}`

            utils.log(sql, 1);

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

                const dict = {};

                cols.forEach((col) => {
                    //utils.log(`${strDateTime}, ${col.value}`);
                    utils.log(JSON.stringify(col), 1);

                    let val = col.value;

                    if (col.metadata.colName === "Page")
                        val = `עמוד ${val}`;

                    dict[col.metadata.colName] = val;
                });

                arr.push(dict);
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

app.post('/login', async(req, res) => {
    let result = null;

    if (req) {
        //let isValid = utils.validateObject(req, ["body"]);

        //utils.log(`isValid = ${isValid}`, 1);

        //isValid = isValid && utils.validateObject(req.body, ["resId", "row", "col"]);

        //utils.log(`isValid = ${isValid}`, 1);

        const user = req.body.user;
        const pass = req.body.pass;

        utils.log(`user = ${user}`);
        utils.log(`pass = ${pass}`);

        try {
            result = await getLogin(user, pass);

            let userId = null;
            let username = null;

            if (result) {
                if ("UserId" in result)
                    userId = result.UserId;

                if ("Username" in result)
                    username = result.Username;
            }

            console.log(`userId from getLogin  = ${userId}`);

            if (!userId) {
                if (username)
                    return res.send(result);
                else
                    result = await createLogin(user, pass);
            }

            console.log(JSON.stringify(result));
        } catch (e) {
            console.log(e);

            result = {
                error: e
            };
        }
    }

    res.send(result);
});

const createLogin = (user, pass) => {
    return new Promise((resolve, reject) => {
        const hashed = sha256Module.sha256Hash(pass);

        const strDateTime = dtu.formatDateTime(new Date());

        const connection = new Connection(config);

        connection.on('connect', (err) => {
            utils.log(`${strDateTime}, connected `);

            let sql = `IF NOT EXISTS (SELECT * FROM ${TableUsers} where Username = '${user}')
                insert into ${TableUsers} (Username, Password, PersonId)
                output inserted.Id, inserted.Password
                values('${user}', '${hashed}', 1)`;

            utils.log(sql, 1);

            request = new Request(sql, function(err, rowCount) {
                if (err) {
                    utils.log(err, 1);
                } else {
                    //utils.log(rowCount + ' rows');
                }
            });

            const userData = {
                UserId: null,
                Password: null
            };

            request.on('row', (cols) => {
                console.log(`cols = ${JSON.stringify(cols)}`);

                if (Array.isArray(cols) && cols.length > 0) {
                    userData.UserId = cols[0].value;
                    userData.Password = cols[1].value;
                }

                console.log(`userData = ${JSON.stringify(userData)}`);
            });

            request.on('requestCompleted', () => {
                connection.close();

                console.log(`userData = ${JSON.stringify(userData)}`);

                resolve(userData);
            });

            request.on('done', (rowCount, more, rows) => {
                console.log(`cols = ${JSON.stringify(rows)}`);

                if (Array.isArray(rows) && rows.length > 0) {
                    const arr = rows[0].value;

                    userData.UserId = arr[0];
                    userData.Password = arr[1];
                }

                console.log(`userData = ${JSON.stringify(userData)}`);

                resolve(userData);
            });

            connection.execSql(request);

            utils.log(`${strDateTime}, after calling exeSql`, 1);
        });

        connection.connect();

        utils.log(`${strDateTime}, after calling connect`, 1);
    });
}

const getLogin = (user, pass) => {
    return new Promise((resolve, reject) => {
        hashed = sha256Module.sha256Hash(pass);

        const strDateTime = dtu.formatDateTime(new Date());

        const connection = new Connection(config);

        connection.on('connect', (err) => {
            utils.log(`${strDateTime}, connected `);

            let sql = `select u.[Id], u.[Password], u.[Username] from ${TableUsers} u 
                where [Username] = '${user}'`;

            utils.log(sql, 1);

            request = new Request(sql, function(err, rowCount) {
                if (err) {
                    utils.log(err, 1);
                } else {
                    //utils.log(rowCount + ' rows');
                }
            });

            const userData = {
                UserId: null,
                Password: null
            };

            request.on('row', (cols) => {
                console.log(`cols = ${JSON.stringify(cols)}`);

                if (Array.isArray(cols) && cols.length > 2) {
                    const userId = cols[0].value;
                    const password = cols[1].value;

                    userData.Username = cols[2].value;

                    if (password === hashed) {
                        userData.UserId = userId;
                        //userData.Password = password;
                    }
                }

                console.log(`userData = ${JSON.stringify(userData)}`);
            });

            request.on('requestCompleted', () => {
                connection.close();

                console.log(`userData = ${JSON.stringify(userData)}`);

                resolve(userData);
            });

            request.on('done', (rowCount, more, rows) => {
                console.log(`cols = ${JSON.stringify(rows)}`);

                if (Array.isArray(rows) && rows.length > 0) {
                    const arr = rows[0].value;

                    if (Array.isArray(arr) && arr.length > 2) {
                        const userId = arr[0];
                        const password = arr[1];

                        userData.Username = arr[2];

                        if (password === hashed) {
                            userData.UserId = userId;
                            //userData.Password = password;
                        }
                    }

                    console.log(`userData = ${JSON.stringify(userData)}`);
                }

                resolve(userData);
            });

            connection.execSql(request);

            utils.log(`${strDateTime}, after calling exeSql`, 1);
        });

        connection.connect();

        utils.log(`${strDateTime}, after calling connect`, 1);
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