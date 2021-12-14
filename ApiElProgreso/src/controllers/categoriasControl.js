const {Request, Response} = require('express');
const db = require ('../../db');

class CategoriasControl{
    Consultar (req, res){
        db.default.query(`SELECT * FROM Categorias
               ORDER BY id desc`, (error, campos) => {
                if (error){
                    res.status(504)
                    throw error;
                } else{
                    res.status(200).json(campos);
                }
            });
    };

    Buscar (req, res){
        const Letra = (req.params.letra);
        db.default.query(`SELECT * FROM Categorias WHERE nombre LIKE ('%${Letra}%') ORDER BY id desc`, (error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

    async Agregar (req, res){
        const data = req.body;
         await db.default.query(`INSERT INTO Categorias SET ?`,[data], (error, campos) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    async Modificar (req, res){
        const data = req.body;
        await db.default.query(`UPDATE Categorias SET ? WHERE id = ?`,[data, req.params.id], (error, campos) => {
           if (error) throw error;
           res.json('Realizado Correctamente');
       });
    };

    async Eliminar (req, res){
        await db.default.query(`DELETE FROM Categorias WHERE id = ?`,[req.params.id], (error, campos) => {
            if (error) throw error;
            res.json('Realizado Correctamente');
        });
    };

    async ModificarPorcentajes (req, res){
        const data = req.default.body;
        await db.default.query(`UPDATE Stock SET porcentaje = ? 
                        WHERE idCategoria = ?`,[data.porcentaje, req.params.id], (error, campos) => {
           if (error) throw error;

           db.default.query(`UPDATE stock 
                    SET precio = costo + (costo*porcentaje/100)
                    WHERE idcategoria = ?`,
            [req.params.id], (error, stock) =>{
                if (error) throw error;
                res.json('Realizado Correctamente');
            })
       });
    };

    Categoriasproducto (req, res){
        db.default.query(`SELECT * FROM Stock 
                Where idCategoria = ?
                ORDER BY id desc`, [req.params.id],(error, campos) => {
                if (error) throw error;
                res.json(campos);
            });
    };

}


const catControl = new CategoriasControl;
exports.default = catControl;