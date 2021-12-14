const {Request, Response} = require ('express');
const db = require ('../../db');

class productoControl{
    Consultar (req, res){
        db.default.query(`SELECT s.*, u.Unidad, c.nombre Categoria FROM Stock s
                  inner join Unidades u on s.idUnidad = u.id
                  inner join Categorias c on c.id = s.idCategoria
                  where s.idSucursal = ?
                  ORDER BY id desc`,[req.params.id], (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    Buscar (req, res){
        const Letra = (req.params.letra);
        const data = req.body;
        db.default.query(`SELECT s.*, u.Unidad, c.nombre Categoria FROM Stock s
                    inner join Unidades u on s.idUnidad = u.id
                    inner join Categorias c on c.id = s.idCategoria
                    WHERE (producto LIKE ('%${Letra}%') or codigo LIKE ('%${Letra}%')) and idSucursal = ? 
                    ORDER BY id desc`, [data.idSucursal], (error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };

    async Agregar (req, res){
        const data = req.body;

            await db.default.query(`insert into Stock(codigo, producto, cantidad, idUnidad, precio, costo, rutaImagen, idSucursal, idCategoria, ganancia, esPorcentaje)
                        Values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [data.codigo, data.producto, data.cantidad = data.cantidad.replace(/,/g, '.'),data.idUnidad, data.precio= data.precio.replace(/,/g, '.') , 
                        data.costo = data.costo.replace(/,/g, '.'),data.rutaImagen= data.rutaImagen.replace(/"/g, ''), data.idSucursal, 
                        data.idCategoria,data.ganancia= data.ganancia.replace(/,/g, '.'), data.esPorcentaje ], (error, stock) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    async Modificar (req, res){
        const data = req.body;
       
        await db.default.query(`UPDATE Stock SET
                        codigo = ?,
                        producto = ?,
                        cantidad = REPLACE (?, ',', '.'),
                        idUnidad = ?,
                        precio = REPLACE (?, ',', '.'),
                        costo = REPLACE (?, ',', '.'),
                        rutaImagen = ?,
                        idCategoria = ?,
                        ganancia = REPLACE (?, ',', '.'),
                        esPorcentaje = ?
                        WHERE id = ?`,[data.codigo, data.producto, data.cantidad, data.idUnidad, data.precio, 
                                       data.costo, data.rutaImagen, data.idCategoria, data.ganancia, data.esPorcentaje, req.params.id], (error, stock) => {
           if (error) throw error;
           res.json('Realizado Correctamente');
       });
    };

    async AgregarCantidad (req, res){
        const data = req.body;
        
        await db.default.query(`UPDATE Stock SET
                        cantidad = REPLACE (?, ',', '.')
                        WHERE id = ?`,[data.cantidad, req.params.id], (error, stock) => {
           if (error) throw error;
           res.json('Realizado Correctamente');
       });
    };

    async Eliminar (req, res){
        await db.query(`DELETE FROM Stock WHERE id = ?`,[req.params.id], (error, movimiento) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    async Descontar (req, res){
        const data = req.body;
        await db.default.query(`UPDATE Stock SET
                        cantidad = cantidad - ?
                        WHERE id = ?`,[data.cantidad = data.cantidad.replace(/,/g, '.'), req.params.id], (error, movimiento) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    async Revertir (req, res){
        const data = req.body;
        await db.default.query(`UPDATE Stock SET
                        cantidad = cantidad + ?
                        WHERE id = ?`,[data.cantidad = data.cantidad.replace(/,/g, '.'), req.params.id], (error, movimiento) => {
                            if (error) throw error;
                            
                            db.query(`DELETE FROM DetalleVentas WHERE id = ?`,
                            [data.id], (error, stock) =>{
                                if (error) throw error;
                                res.json('Realizado Correctamente');
                            })
                        });
    };

    ObtenerProVenta (req, res){
        db.default.query(`SELECT * FROM  DetalleVentas
                WHERE idProducto = ?`,[req.params.id] ,(error, stock) => {
                if (error) throw error;
                res.json(stock);
            });
    };
}


const proControl = new productoControl;
exports.default = proControl;