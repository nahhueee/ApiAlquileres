const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'creationcode.tk',
    user: 'nahu852n_creation',
    password: "Na43797231N",
    database: 'nahu852n_dbProgreso',
    multipleStatements: true
});
mysqlConnection.connect(function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log('DB Conectado Correctamente');
    }
});
exports.default = mysqlConnection;