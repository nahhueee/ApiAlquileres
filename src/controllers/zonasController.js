const {Request, Response} = require('express');
var pool = require('../../db').pool;

class ZonasControl{
  

    ConsultarZonas (req, res){
      pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query(`SELECT z.*, IFNULL(COUNT(a.id),0) alojamientos from zonas z 
                          LEFT JOIN alquileres a on z.id = a.idZona
                          GROUP BY z.id
                          ORDER BY z.id`, [req.params.id], function (error, fields) {
          
          connection.release();
      
          // Handle error after the release.
          if (error) throw error;
          res.json(fields);
        });
     });
    };

    ConsultarDetalleZona (req, res){
      pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query(`SELECT z.* from zonas z 
                          WHERE z.id = ?
                          `,[req.params.id], function (error, fields) {
          
          connection.release();
      
          // Handle error after the release.
          if (error) throw error;
          res.json(fields);
        });
     });
    };

    ConsultarAlojamientos (req, res){
      pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query(`SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a 
                          LEFT JOIN comentarios c on a.id = c.idAlquiler
                          INNER JOIN zonas z on z.id = a.idZona
                          WHERE idZona = ?
                          GROUP BY a.id
                          ORDER BY RAND()
                          `,[req.params.id], function (error, fields) {
          
          connection.release();
      
          // Handle error after the release.
          if (error) throw error;
          res.json(fields);
        });
     });
    };
}


const zonaControl = new ZonasControl;
exports.default = zonaControl;