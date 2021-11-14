const {Request, Response} = require('express');
const db = require ('../../db');

class AlquileresControl{
    ConsultarDestacados (req, res){
        db.default.query(`SELECT * FROM Alquileres WHERE destacado = 1 ORDER BY RAND()`, [req.params.id],(error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };
}


const alquilerControl = new AlquileresControl;
exports.default = alquilerControl;