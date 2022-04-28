
//Pool de Conexion MySQL
var pool  = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: "",
    database: 'dbvalleserrano',
    multipleStatements: true
});

module.exports.pool = pool;

