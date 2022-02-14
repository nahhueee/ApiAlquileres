
// const mysqlConnection = mysql.createConnection({
//     host: 'valleserrano.ar',
//     user: 'valleser_admin',
//     password: "Na43797231",
//     database: 'valleser_dbValleSerrano',
//     multipleStatements: true
// });
// mysqlConnection.connect(function (error) {
//     if (error) {
//         console.log(error);
//     }
//     else {
//         console.log('DB Conectado Correctamente');
//     }
// });
var pool  = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: "",
    database: 'dbvalleserrano',
    multipleStatements: true
});

// var mysql = require('mysql');
// var pool  = mysql.createPool({
//     host: '31.220.31.6',
//     user: 'nahhueee',
//     password: "43797231",
//     database: 'valleserrano',
//     multipleStatements: true
// });
module.exports.pool = pool;

