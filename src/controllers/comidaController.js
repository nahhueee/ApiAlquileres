const {Request, Response} = require('express');
var pool = require('../../db').pool;

class ComidaControl{
  

    ConsultarDelivery(req, res){
      pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query(`SELECT * FROM delivery ORDER BY RAND()`, function (error, fields) {
          
          connection.release();
      
          // Handle error after the release.
          if (error) throw error;
          res.json(fields);
        });
     });
    };
}


const cControl = new ComidaControl;
exports.default = cControl;