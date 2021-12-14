const {Request, Response} =require ('express');
const db = require('../../db');

class extraccionControl{
    Consultar (req, res){
        db.default.query(`SELECT * FROM Extracciones
                  WHERE idCaja = ? 
                  order by id desc`, [req.params.id],(error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    async Agregar (req, res){
        const data = req.body;
        
         await db.default.query(`insert into Extracciones(descripcion, idCaja, monto)
                         Values(?,?,?)`,
                         [data.descripcion,data.idCaja,data.monto = data.monto.replace(/,/g, '.')], (error, stock) => 
                         {
                            if (error) throw error;
                            
                             db.default.query(`UPDATE Cajas SET extracciones = extracciones + ? WHERE id = ?`,
                            [data.monto = data.monto.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                                if (error) throw error;
                                res.json('Realizado Correctamente');
                            })
                        });
    };

    async Eliminar (req, res){
        const data = req.body;
        await db.default.query(`DELETE FROM Extracciones WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            
            db.default.query(`UPDATE Cajas SET extracciones = extracciones - ? WHERE id = ?`,
            [data.monto = data.monto.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                if (error) throw error;
                res.json('Realizado Correctamente');
            })
        });
    };
}


const extraControl = new extraccionControl;
exports.default = extraControl;