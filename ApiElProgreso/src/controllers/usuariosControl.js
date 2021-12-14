const {Request, Response} = require('express');
const db = require('../../db');

class UsuarioControl{
    Ingresar (req, res){
        const data = req.body;
        db.default.query(`SELECT u.*, c.cargo FROM Usuarios u
                  inner join Cargos c on u.idcargo = c.id
                  WHERE usuario = ? and contrasenia =?`, [data.usuario, data.contrasenia],(error, users) => {
                if (error){
                    res.status(504)
                    throw error;
                } else{
                    res.status(200).json(users);
                }
               
            });
    };

    Consultar (req, res){
        const data = req.body;
        db.default.query(`SELECT u.*, c.cargo FROM Usuarios u
                  inner join Cargos c on u.idcargo = c.id
                  `,(error, users) => {
                if (error){
                    res.status(503)
                    throw error;
                } else{
                    res.status(200).json(users);
                }
            });
    };

    VerificarUsuario (req, res){
        const data = req.body;
        db.default.query(`SELECT u.*, c.cargo FROM Usuarios u
                  inner join Cargos c on u.idcargo = c.id
                  WHERE usuario = ?`, [req.params.usuario],(error, users) => {
                if (error) throw error;
                res.json(users);
            });
    };

    async Agregar (req, res){
        const data = req.body;
        
         await db.default.query(`insert into Usuarios(usuario,nombre,contrasenia,idcargo,idSucursal) Values(?,?,?,?,?)`,
                    [data.usuario, data.nombre, data.contrasenia, data.idcargo, data.idSucursal], (error, users) => {
                    if (error) throw error;
                    res.json('Realizado Correctamente');
        });
    };

    async Modificar (req, res){
        const data = req.body;
        
         await db.default.query(`Update Usuarios SET 
                        usuario = ?, nombre = ?, contrasenia =?, idcargo=?, idSucursal=?
                        Where id = ?`,
                    [data.usuario, data.nombre, data.contrasenia, data.idcargo,data.idSucursal,req.params.id] ,(error, users) => {
                    if (error) throw error;
                    res.json('Realizado Correctamente');
        });
    };

    async Eliminar (req, res){
        const data = req.body;
        await db.default.query(`DELETE FROM Usuarios WHERE id = ?`,[req.params.id], (error, users) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
           });
    };
}

const userControl = new UsuarioControl;
exports.default = userControl;