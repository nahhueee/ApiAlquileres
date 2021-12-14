const {Request, Response} = require('express');
const db = require ('../../db');

class cajasControl{
    Consultar (req, res){
        db.default.query(`SELECT c.*, u.nombre responsable FROM Cajas c
                  inner join Usuarios u ON c.idResponsable = u.id
                  where c.idSucursal = ?
                  ORDER BY c.id desc`, [req.params.id],(error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    ConsultarActivas (req, res){
        db.default.query(`SELECT c.* FROM Cajas c
                  where finalizada = 0
                  `,(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    Buscar (req, res){
        const Letra = (req.params.letra);
        const data = req.body;
        db.default.query(`SELECT c.*, u.nombre responsable FROM Cajas c
                  inner join Usuarios u ON c.idResponsable = u.id
                  WHERE c.id LIKE ('%${Letra}%') and c.idSucursal = ?
                  ORDER BY c.id desc`,[data.idSucursal], (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    UltimaCaja (req, res){
        db.default.query(`SELECT * FROM Cajas
                  ORDER BY id desc
                  LIMIT 1 `, (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };
    
    async Agregar (req, res){
        const data = req.body;
        await db.default.query(`INSERT INTO Cajas(fecha, idResponsable, extracciones, pagos, inicial, totalVentas, idSucursal, finalizada)
        Values(?, ?, ?, ?, ?, ?, ?, ?)`,
        [data.fecha, data.idResponsable, data.extracciones=data.extracciones.replace(/,/g, '.'), data.pagos=data.pagos.replace(/,/g, '.'), data.inicial= data.inicial.replace(/,/g, '.'), data.totalVentas=data.totalVentas.replace(/,/g, '.'), data.idSucursal, data.finalizada], (error, stock) => {
        if (error) throw error;
        res.json('Realizado Correctamente');
        });
    };

    async Modificar (req, res){
        const data = req.body;
        
        await db.default.query(`UPDATE Cajas SET
                        fecha = ?,
                        idResponsable = ?,
                        extracciones = REPLACE (?, ',', '.'),
                        pagos = REPLACE (?, ',', '.'),
                        inicial = REPLACE (?, ',', '.'),
                        totalVentas = REPLACE (?, ',', '.')
                        WHERE id = ?`,[data.fecha, data.idResponsable, data.extracciones, 
                                       data.pagos,data.inicial, data.totalVentas, req.params.id], (error, stock) => {
           if (error) throw error;
           res.json('Realizado Correctamente');
       });
    };

    async Eliminar (req, res){
        await db.default.query(`DELETE FROM Cajas WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            
            db.default.query(`DELETE FROM PagosCaja WHERE idCaja = ?`,
            [req.params.id], (error, stock) =>{
                if (error) throw error;
                
                db.default.query(`DELETE FROM Extracciones WHERE idCaja = ?`,
                [req.params.id], (error, stock) =>{
                    if (error) throw error;
                    res.json('Realizado Correctamente');
                })
            });
        });
    };

    async Finalizar (req, res){
        await db.default.query(`UPDATE Cajas SET 
                        finalizada = 1
                        Where id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    async Revertir (req, res){
        await db.default.query(`UPDATE Cajas SET 
                        finalizada = 0
                        Where id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    async ConsultarTotales (req, res){

        await db.default.query(`select count(v.id) CantVentas, sum(v.precioCosto) TotalCosto, c.extracciones, c.pagos, c.inicial, c.totalVentas from Cajas c
                INNER join Ventas v on v.idCaja = c.id
                where c.id = ?
                GROUP BY c.id`, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    ConsultarComparativa (req, res){
        db.default.query(`select fecha FechaComparativa, totalVentas TotalComparativo from Cajas
         Where (fecha BETWEEN YEAR(NOW()) and (SELECT fecha FROM Cajas Where Id = ?)) and finalizada = 1
         order by fecha asc
         limit 6`, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    async ConsultarDetalles (req, res){

        await db.default.query(`SELECT c.id idCaja, c.fecha, u.nombre, c.extracciones, c.pagos, c.inicial, c.totalVentas, v.id idVenta, v.totalAPagar, v.pagaCon, v.cambio, tp.tipoPago From Cajas c
                inner join Usuarios u on u.id = c.idResponsable
                INNER JOIN Ventas v on v.idCaja = c.id
                INNER join TipoPagos tp on tp.id = v.idTipoPago
                where c.id = ?`, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };
}


const cjaControl = new cajasControl;
exports.default = cjaControl;