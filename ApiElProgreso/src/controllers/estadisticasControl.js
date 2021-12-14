const {Request, Response} = require('express');
const db = require ('../../db');


class EstadisticasControl{
    
    Consultar (req, res){
                const data = req.body;
               db.default.query(`select fecha, totalAPagar, precioCosto, totalAPagar-precioCosto Ganancia From Ventas
               where (fecha BETWEEN ? and ?) and idSucursal = ?
               order by fecha asc`, [data.fechaInicio, data.fechaFin, data.idSucursal],(error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    ConsultarDetalle (req, res){
        const data = req.body;
       db.default.query(`Select dv.idProducto, dv.cantidad, dv.idUnidad, dv.total-dv.costo Ganancia, s.producto From DetalleVentas dv
       inner join Stock s on s.id = dv.idProducto
       where (dv.fecha BETWEEN ? and ?) and dv.idSucursal = ?`, [data.fechaInicio, data.fechaFin, data.idSucursal],(error, stock) => {
        if (error) throw error;
        res.json(stock);
    });
    };

    ConsultarCajas (req, res){
        const data = req.body;
       db.default.query(`Select id from Cajas
        where (fecha BETWEEN ? and ?) and idSucursal = ?`, [data.fechaInicio, data.fechaFin, data.idSucursal],(error, stock) => {
        if (error) throw error;
        res.json(stock);
    });
    };
}

const estadisticaControl = new EstadisticasControl;
exports.default = estadisticaControl;