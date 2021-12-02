const {Request, Response} = require('express');
const db = require ('../../db');

class AlquileresControl{
    ConsultarDestacados (req, res){
        db.default.query(`SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a 
                        LEFT JOIN comentarios c on a.id = c.idAlquiler
                        INNER JOIN zonas z on z.id = a.idZona
                        WHERE destacado = 1
                        GROUP BY a.id
                        ORDER BY RAND()`,(error, stock) => {
                        if (error) throw error;
                        res.json(stock);
            });
    };

    ObtenerAlquileres (req, res){
        const data = req.body;
        var variable = ''
        var parametros = []

        console.log(data)

        
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


        const query = `SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a 
        LEFT JOIN comentarios c on a.id = c.idAlquiler
        INNER JOIN zonas z on z.id = a.idZona` + variable + `
        GROUP BY a.id
        ORDER BY a.id DESC`;

        db.default.query(query, parametros ,(error, stock) => {
        if (error) throw error;
        res.json(stock);
        });

    };

    ConsultarDetalleAlquiler (req, res){
        db.default.query(`SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a 
                        LEFT JOIN comentarios c on a.id = c.idAlquiler
                        INNER JOIN zonas z on z.id = a.idZona
                        WHERE a.id = ?
                        GROUP BY a.id
                        ORDER BY RAND()`, [req.params.id],(error, stock) => {
                        if (error) throw error;
                        res.json(stock);
            });
    };
}


const alquilerControl = new AlquileresControl;
exports.default = alquilerControl;