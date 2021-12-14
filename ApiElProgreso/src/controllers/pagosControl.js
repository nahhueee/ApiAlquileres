const {Request, Response} = require ('express');
const db = require ('../../db');

class PagosControl{
    Consultar (req, res){
        db.defualt.query(`SELECT * FROM PagosCaja
                  WHERE idCaja = ? 
                  order by id desc`, [req.params.id],(error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    async Agregar (req, res){
        const data = req.body;
        
         await db.defualt.query(`insert into PagosCaja(descripcion, idCaja, monto)
                         Values(?,?,?)`,
                         [data.descripcion, data.idCaja, data.monto = data.monto.replace(/,/g, '.')], (error, stock) => 
                         {
                            if (error) throw error;
                            
                             db.defualt.query(`UPDATE Cajas SET pagos = pagos + ? WHERE id = ?`,
                            [data.monto = data.monto.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                                if (error) throw error;
                                res.json('Realizado Correctamente');
                            })
                        });
    };

    

    async Eliminar (req, res){
        const data = req.body;
        await db.defualt.query(`DELETE FROM PagosCaja WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            
            db.defualt.query(`UPDATE Cajas SET pagos = pagos - ? WHERE id = ?`,
            [data.monto = data.monto.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                if (error) throw error;
                res.json('Realizado Correctamente');
            })
        });
    };
}


const pagoControl = new PagosControl;
exports.default =  pagoControl;