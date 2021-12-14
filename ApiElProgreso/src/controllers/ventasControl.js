const {Request, Response} = require ('express');
const db = require('../../db');

class ventasControl{
     Consultar (req, res){
        db.default.query(`SELECT v.*, u.nombre Responsable, tp.tipoPago TipoDePago FROM Ventas v
                  inner join Usuarios u on u.id = v.idResponsable
                  inner join TipoPagos tp on tp.id = v.idTipoPago
                  where idCaja = ?
                  order by v.id desc`,[req.params.id], (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

     UltimaVenta (req, res){
        db.default.query(`SELECT id FROM Ventas
                  ORDER BY id desc
                  LIMIT 1 `, (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    async Agregar (req, res){
        const data = req.body;
        
        await db.default.query(`insert into Ventas(idCaja, fecha, idResponsable, idTipoPago, pagaCon, cambio, totalAPagar, precioCosto, idSucursal)
                         Values(?, ?, ?, ?, ?,?,?,?,?)`,
        [data.idCaja, data.fecha, data.idResponsable,data.idTipoPago, data.pagaCon= data.pagaCon.replace(/,/g, '.') , 
        data.cambio = data.cambio.replace(/,/g, '.'), data.totalAPagar = data.totalAPagar.replace(/,/g, '.'), data.precioCosto = data.precioCosto.replace(/,/g, '.'), data.idSucursal], (error, stock) => 
        
        {
            if (error) throw error;
            
             db.default.query(`UPDATE Cajas SET totalVentas = totalVentas + ? WHERE id = ?`,
            [data.totalAPagar = data.totalAPagar.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                if (error) throw error;
                res.json('Realizado Correctamente');
            })
        });
    };  

    async Eliminar (req, res){
        const data = req.body;
        await db.default.query(`DELETE FROM Ventas WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            
            db.default.query(`UPDATE Cajas SET totalVentas = totalVentas - ? WHERE id = ?`,
            [data.total = data.total.replace(/,/g, '.'), data.idCaja], (error, stock) =>{
                if (error) throw error;
                res.json('Realizado Correctamente');
            })
        });
    };
}


const vtaControl = new ventasControl;
exports.default = vtaControl;