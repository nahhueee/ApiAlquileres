const {Request, Response} = require('express');
const db = require ('../../db');
const moment = require('moment');

class AlquileresControl{
    ConsultarDestacados (req, res){
        db.default.query(`SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a 
                        LEFT JOIN comentarios c on a.id = c.idAlquiler
                        INNER JOIN zonas z on z.id = a.idZona
                        WHERE destacado = 1
                        GROUP BY a.id
                        ORDER BY RAND()`,(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };

    ObtenerAlquileres (req, res){
        const data = req.body;
        var variable = ''
        var parametros = []

        
        if(data.Localidad!=0 && data.Categoria==0 && data.Personas==''){
            variable = ' WHERE a.idZona = ? '
            parametros = [data.Localidad]
        }
        if(data.Localidad!=0 && data.Categoria!=0 && data.Personas==''){
            variable = ' WHERE a.idZona = ? and a.idCategoria = ? '
            parametros = [data.Localidad, data.Categoria]
        }
        if(data.Localidad!=0 && data.Categoria==0 && data.Personas!=''){
            variable = ' WHERE a.idZona = ? and a.capacidad >= ? '
            parametros = [data.Localidad, data.Personas]
        }
        if(data.Localidad!=0 && data.Categoria!=0 && data.Personas!=''){
            variable = ' WHERE a.idZona = ? and a.idCategoria = ? and a.capacidad >= ? '
            parametros = [data.Localidad, data.Categoria, data.Personas]
        }
        if(data.Localidad==0 && data.Categoria!=0 && data.Personas==''){
            variable = ' WHERE a.idCategoria = ? '
            parametros = [data.Categoria]
        }
        if(data.Localidad==0 && data.Categoria==0 & data.Personas!=''){
            variable = ' WHERE a.capacidad >= ? '
            parametros = [data.Personas]
        }
        if(data.Categoria==0 & data.Personas=='' & data.Localidad==0){
            variable = ''
            parametros = [data.Categoria]
        }


        const query = `SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, z.nombre zona from alquileres a 
        LEFT JOIN comentarios c on a.id = c.idAlquiler
        INNER JOIN zonas z on z.id = a.idZona` + variable + `
        GROUP BY a.id
        ORDER BY a.id DESC`;

        db.default.query(query, parametros ,(error, campos) => {
        if (error) throw error;
        res.json(campos);
        });

    };

    ConsultarRelacionados (req, res){
        const data = req.body;
        db.default.query(`SELECT id, imgPrincipal, nombre, precioCond, precioGral from alquileres  
                        WHERE idZona = ? and idCategoria = ? and id != ?
                        ORDER BY RAND()`,[data.idZona, data.idCategoria, data.idAlquiler],(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };


    ConsultarDetalleAlquiler (req, res){
        db.default.query(`SELECT a.*, FORMAT(IFNULL(SUM(c.raiting)/COUNT(c.raiting),0),2) Raiting, COUNT(c.raiting) cantValoraciones, z.nombre zona, ca.categoria from alquileres a 
                        LEFT JOIN comentarios c on a.id = c.idAlquiler
                        INNER JOIN zonas z on z.id = a.idZona
                        INNER JOIN categorias ca on ca.id = a.idCategoria
                        WHERE a.id = ?
                        GROUP BY a.id
                        ORDER BY RAND()`, [req.params.id],(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };
    ConsultarServiciosAlquiler (req, res){
        db.default.query(`SELECT s.icono, s.nombre servicio, sa.descripcion FROM serviciosAlquiler sa 
                        INNER JOIN servicios s on s.id = sa.idServicio
                        WHERE sa.idAlquiler = ?`, [req.params.id],(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };
    ConsultarGaleriaAlquiler (req, res){
        db.default.query(`SELECT imagen thumb FROM Galeria 
                          WHERE idAlquiler = ?`, [req.params.id],(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };
    ConsultarTarifaAlquiler (req, res){
        db.default.query(`SELECT ta.descripcion, t.icono, t.tarifa, t.c FROM tarifasAlquiler ta
                          INNER JOIN tarifas t on t.id = ta.idTarifa 
                          WHERE ta.idAlquiler = ?`, [req.params.id],(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };
    ConsultarReseñasAlquiler (req, res){
        db.default.query(`SELECT titulo, descripcion, raiting, DATE_FORMAT(fecha, "%d-%m-%Y") fecha FROM comentarios
                          WHERE idAlquiler = ?
                          ORDER BY id DESC`, [req.params.id],(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };
    ConsultarCondicionesAlquiler (req, res){
        db.default.query(`SELECT * FROM condicionesalquiler
                          WHERE idAlquiler = ?
                          `, [req.params.id],(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };

    ConsultarTotalRaiting (req, res){
        db.default.query(`SELECT FORMAT(IFNULL(SUM(raiting)/COUNT(raiting),0),2) Raiting, COUNT(raiting) cantValoraciones from comentarios 
                          WHERE idAlquiler=?`, [req.params.id],(error, campos) => {
                        if (error) throw error;
                        res.json(campos);
            });
    };
    ConsultarEmailComentario (req, res){
        const data = req.body;
        console.log(data)
        db.default.query(`SELECT id from comentarios 
                          WHERE idAlquiler=? and mail=?`, [data.idAlquiler, data.mail],(error, campos) => {
                        if (error) throw error;
                        // res.json(campos);
                        if(campos.length==0){
                            res.json("Ok")
                        }else{
                            res.json("Not Ok")
                        }
            });
    };


    AgregarComentario (req, res){
        const data = req.body;
        var fecha = moment(new Date()).format('YYYY/MM/DD')
       
        db.default.query(`INSERT INTO Comentarios (idAlquiler, raiting, titulo, descripcion, fecha, mail)
                          VALUES (?,?,?,?,?,?)`, [data.idAlquiler, data.numero, data.titulo, data.descripcion, fecha , data.mail],(error, campos) => {
                        if (error) throw error;
                        if(error){
                            res.json('Error');
                        }else{
                            res.json('Realizado');
                        }
        });
    };
}


const alquilerControl = new AlquileresControl;
exports.default = alquilerControl;