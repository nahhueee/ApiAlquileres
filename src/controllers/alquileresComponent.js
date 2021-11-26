const {Request, Response} = require('express');
const db = require ('../../db');

class AlquileresControl{
    ConsultarDestacados (req, res){
        db.default.query(`SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a 
                        LEFT JOIN comentarios c on a.id = c.idAlquiler
                        INNER JOIN zonas z on z.id = a.idZona
                        WHERE destacado = 1
                        GROUP BY a.id
                        ORDER BY RAND()`, [req.params.id],(error, stock) => {
                        if (error) throw error;
                        res.json(stock);
            });
    };

    ObtenerAlquileres (req, res){
        const data = req.body;
        console.log(data)

        if(data.Localidad!=undefined){
            db.default.query(`SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a 
            LEFT JOIN comentarios c on a.id = c.idAlquiler
            INNER JOIN zonas z on z.id = a.idZona
            WHERE a.idZona = ?
            GROUP BY a.id
            ORDER BY a.id DESC`, [data.Localidad],(error, stock) => {
            if (error) throw error;
            res.json(stock);
            });
        }

    };
}


const alquilerControl = new AlquileresControl;
exports.default = alquilerControl;