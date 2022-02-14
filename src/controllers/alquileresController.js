const {Request, Response} = require('express');
var pool = require('../../db').pool;
const moment = require('moment');


class AlquileresControl{
   
    ConsultarDestacados (req, res){
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a 
                              LEFT JOIN comentarios c on a.id = c.idAlquiler
                              INNER JOIN zonas z on z.id = a.idZona
                              WHERE destacado = 1
                              GROUP BY a.id
                              ORDER BY RAND()`, function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    }
    
     ObtenerTodos (req, res){
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT id code, nombre name FROM alquileres`, function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    }
    
    ObtenerClicks (req, res){
        const data = req.body;
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT count(id) clicks FROM clicks
            WHERE idAlquiler = ? and MONTH(fecha) = ?
            GROUP BY MONTH(fecha)`,[data.idAlquiler,data.mes], function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    }

    ObtenerAlquileres (req, res){
        const data = req.body;
        var cant = 0
        var filtroService = ''
        var variable = ''
        var parametros = []

        data.Servicios.forEach(function(elemento) {
            if(elemento.isSelected==true){
                cant = cant + 1
                if(cant==1){
                    filtroService = filtroService + "sa.IdServicio = " + elemento.id
                }else{
                    filtroService = filtroService + " OR sa.IdServicio = " + elemento.id
                }
                
            }
        })

       console.log(filtroService)
        
        if(data.Localidad!=0 && data.Categoria==0 && data.Personas==''){
            variable = ' WHERE a.idZona = ? '
            parametros = [data.Localidad]
        }
        if(data.Localidad!=0 && data.Categoria!=0 && data.Personas==''){
            variable = ' WHERE a.idZona = ? and a.idCategoria = ? '
            parametros = [data.Localidad, data.Categoria]
        }
        if(data.Localidad!=0 && data.Categoria==0 && data.Personas!=''){
            variable = ' WHERE a.idZona = ? and a.capacidad >= ? '
            parametros = [data.Localidad, data.Personas]
        }
        if(data.Localidad!=0 && data.Categoria!=0 && data.Personas!=''){
            variable = ' WHERE a.idZona = ? and a.idCategoria = ? and a.capacidad >= ? '
            parametros = [data.Localidad, data.Categoria, data.Personas]
        }
        if(data.Localidad==0 && data.Categoria!=0 && data.Personas==''){
            variable = ' WHERE a.idCategoria = ? '
            parametros = [data.Categoria]
        }
        if(data.Localidad==0 && data.Categoria==0 & data.Personas!=''){
            variable = ' WHERE a.capacidad >= ? '
            parametros = [data.Personas]
        }
        if(data.Categoria==0 & data.Personas=='' & data.Localidad==0){
            variable = ''
            parametros = [data.Categoria]
        }

        if(cant==0){
            const query = `SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a 
            LEFT JOIN comentarios c on a.id = c.idAlquiler
            INNER JOIN zonas z on z.id = a.idZona` + variable + `
            GROUP BY a.id
            ORDER BY a.id DESC`;

            pool.getConnection(function(err, connection) {
                // Use the connection
                connection.query(query, parametros, function (error, fields) {
                  
                  connection.release();
              
                  // Handle error after the release.
                  if (error) throw error;
                  res.json(fields);
                });
            });
        }else{
            const query = `
            SELECT * FROM (
                SELECT Count(sa.idAlquiler) nrequisitos, Alojamientos.* FROM serviciosalquiler sa
                INNER JOIN (
                SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a
                INNER JOIN zonas z on z.id = a.idZona
                LEFT JOIN comentarios c on a.id = c.idAlquiler `
                 + variable + `
                GROUP BY a.id) Alojamientos on Alojamientos.id = sa.idAlquiler
                WHERE `+ filtroService +`
                GROUP BY sa.idAlquiler ) Resultados
                WHERE Resultados.nrequisitos = ` +cant+ ``;

                // SELECT * FROM (
                // SELECT Count(sa.IdAlquiler) nrequisitos, Alojamientos.* FROM serviciosalquiler sa
                // INNER JOIN (
                // SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a
                // INNER JOIN zonas z on z.id = a.idZona
                // LEFT JOIN comentarios c on a.id = c.idAlquiler
                // GROUP BY a.id) Alojamientos on Alojamientos.id = sa.IdAlquiler
                // WHERE sa.IdServicio = 3
                // GROUP BY sa.IdAlquiler ) Resultados
                // WHERE Resultados.nrequisitos = 1

            
                pool.getConnection(function(err, connection) {
                    // Use the connection
                    connection.query(query, parametros, function (error, fields) {
                      
                      connection.release();
                  
                      // Handle error after the release.
                      if (error) throw error;
                      res.json(fields);
                    });
                });
        }
        
    };

    ConsultarRelacionados (req, res){
        const data = req.body;

        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT id, imgPrincipal, nombre, precioCond, precioGral, verificado from alquileres  
                              WHERE idZona = ? and idCategoria = ? and id != ?
                              ORDER BY RAND()`,
                              [data.idZona, data.idCategoria, data.idAlquiler], function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    };


    ConsultarDetalleAlquiler (req, res){
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, COUNT(c.raiting) cantValoraciones, z.nombre zona, ca.categoria from alquileres a 
                              LEFT JOIN comentarios c on a.id = c.idAlquiler
                              INNER JOIN zonas z on z.id = a.idZona
                              INNER JOIN categorias ca on ca.id = a.idCategoria
                              WHERE a.id = ?
                              GROUP BY a.id
                              ORDER BY RAND()`, [req.params.id], function (error, fields) {
                                  
                              connection.query(`INSERT INTO clicks(fecha,idAlquiler) VALUES (CURDATE(),?)`, [req.params.id], function (error, fields) {})
                              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    };
   
    ConsultarServiciosAlquiler (req, res){
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT s.icono, s.nombre servicio, sa.descripcion FROM serviciosalquiler sa 
                              INNER JOIN servicios s on s.id = sa.idServicio
                              WHERE sa.idAlquiler = ?
                              ORDER BY RAND()`, [req.params.id], function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    };

    ConsultarGaleriaAlquiler (req, res){
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT imagen thumb FROM galeria 
                              WHERE idAlquiler = ?`, [req.params.id], function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    };

    ConsultarTarifaAlquiler (req, res){
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT ta.descripcion, t.icono, t.tarifa, t.c FROM tarifasalquiler ta
                              INNER JOIN tarifas t on t.id = ta.idTarifa 
                              WHERE ta.idAlquiler = ?`, [req.params.id], function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    };
    ConsultarReseñasAlquiler (req, res){
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT titulo, descripcion, raiting, DATE_FORMAT(fecha, "%d-%m-%Y") fecha FROM comentarios
                              WHERE idAlquiler = ?
                              ORDER BY id DESC`, [req.params.id], function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    };
    ConsultarCondicionesAlquiler (req, res){
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT * FROM condicionesalquiler
                              WHERE idAlquiler = ?`, [req.params.id], function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    };

    ConsultarTotalRaiting (req, res){
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT FORMAT(IFNULL(SUM(raiting)/COUNT(raiting),0),2) Raiting, COUNT(raiting) cantValoraciones from comentarios 
                              WHERE idAlquiler=?`, [req.params.id], function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              res.json(fields);
            });
        });
    };
    ConsultarEmailComentario (req, res){
        const data = req.body;

        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`SELECT id from comentarios 
                              WHERE idAlquiler=? and mail=?`, [data.idAlquiler, data.mail], function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              if(fields.length==0){
                res.json("Ok")
              }else{
                res.json("Not Ok")
              }
            });
        });
    };


    AgregarComentario (req, res){
        const data = req.body;
        var fecha = moment(new Date()).format('YYYY/MM/DD')
       
        pool.getConnection(function(err, connection) {
            // Use the connection
            connection.query(`INSERT INTO comentarios (idAlquiler, raiting, titulo, descripcion, fecha, mail)
                              VALUES (?,?,?,?,?,?)`, [data.idAlquiler, data.numero, data.titulo, data.descripcion, fecha , data.mail], function (error, fields) {
              
              connection.release();
          
              // Handle error after the release.
              if (error) throw error;
              if(error){
                res.json('Error');
              }else{
                res.json('Realizado');
              }
            });
        });
    };
}


const alquilerControl = new AlquileresControl;
exports.default = alquilerControl;