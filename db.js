const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: "",
    database: 'dbAlquileres',
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