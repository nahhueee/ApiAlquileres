const {Request, Response} = require('express');
const db = require('../../db');

class detVentasControl{
    Consultar (req, res){
        db.default.query(`SELECT dv.*, s.Producto, u.Unidad FROM DetalleVentas dv
                  inner join Stock s on s.id = dv.idProducto
                  inner join Unidades u on u.id = dv.idUnidad
                  WHERE dv.idVenta = ? 
                  ORDER BY dv.id desc`, [req.params.id], (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    ConsultarDeCaja (req, res){
        db.default.query(`SELECT dv.*, s.Producto, u.Unidad, v.idCaja FROM DetalleVentas dv
                  inner join Stock s on s.id = dv.idProducto
                  inner join Unidades u on u.id = dv.idUnidad
                  inner join Ventas v on v.id = dv.idVenta
                  Inner join Cajas c on c.id = v.idCaja
                  WHERE v.idCaja = ? 
                  ORDER BY dv.id desc`, [req.params.id], (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    async Agregar (req, res){
        const data = req.body;
        
         await db.default.query(`insert into DetalleVentas(idVenta, idProducto, fecha, cantidad, precio, costo, total, idUnidad, idSucursal)
                         Values(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
         [data.idVenta, data.idProducto, data.fecha, data.cantidad = data.cantidad.replace(/,/g, '.'), data.precio= data.precio.replace(/,/g, '.'), 
          data.costo = data.costo.replace(/,/g, '.'), data.total = data.total.replace(/,/g, '.'), data.idUnidad, data.idSucursal], (error, stock) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    async Eliminar (req, res){
        await db.default.query(`DELETE FROM Cajas WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    ConsultarProductosElegidosKg (req, res){
        const data = req.body;
        db.default.query(`Select sum(dv.cantidad) CantidadKg, s.producto ProductoKg from Ventas v
        INNER join DetalleVentas dv on dv.idVenta = v.id
        inner join Stock s on s.id = dv.idProducto
        Where dv.idUnidad = 2 and v.idCaja = ?
        GROUP by dv.idProducto
        limit 5
        `, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    ConsultarProductosElegidosUni (req, res){
        const data = req.body;
        db.default.query(`Select sum(dv.cantidad) CantidadUni, s.producto ProductoUni from Ventas v
        INNER join DetalleVentas dv on dv.idVenta = v.id
        inner join Stock s on s.id = dv.idProducto
        Where dv.idUnidad = 1 and v.idCaja = ?
        GROUP by dv.idProducto
        limit 5
        `, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    ConsultarDetVentasCaja (req, res){
        db.default.query(`SELECT idProducto, s.producto, sum(dv.cantidad)Cantidad, u.Unidad, sum(dv.costo)TotalCosto, sum(dv.total)TotalPrecio, (sum(dv.total)-sum(dv.costo))Ganancia FROM Ventas v
        inner join DetalleVentas dv on dv.idVenta = v.id
        inner join Stock s on s.id = dv.idproducto
        inner join Unidades u on u.id = dv.idunidad
        where v.idCaja = ?
        group by idProducto
        `, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };
    ConsultarDetVentasCategoria (req, res){
        const data = req.body
         
        db.default.query(`SELECT idProducto, s.producto, sum(dv.cantidad)Cantidad, u.Unidad, sum(dv.costo)TotalCosto, sum(dv.total)TotalPrecio, (sum(dv.total)-sum(dv.costo))Ganancia FROM Ventas v
        inner join DetalleVentas dv on dv.idVenta = v.id
        inner join Stock s on s.id = dv.idproducto
        inner join Unidades u on u.id = dv.idunidad
        where v.idCaja = ? and s.idCategoria = ?
        group by idProducto
        `, [data.idCaja, data.idCategoria],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };
}


const detVtaControl = new detVentasControl;
exports.default = detVtaControl;