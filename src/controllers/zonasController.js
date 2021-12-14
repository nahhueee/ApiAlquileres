const {Request, Response} = require('express');
const db = require ('../../db');

class ZonasControl{
    ConsultarZonas (req, res){
        db.default.query(`SELECT z.*, IFNULL(COUNT(a.id),0) alojamientos from Zonas z 
                          LEFT JOIN Alquileres a on z.id = a.idZona
                          GROUP BY z.id
                          ORDER BY z.id`,(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };

    ConsultarDetalleZona (req, res){
        db.default.query(`SELECT z.* from Zonas z 
                          WHERE z.id = ?
                          `,[req.params.id],(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };
}


const zonaControl = new ZonasControl;
exports.default = zonaControl;