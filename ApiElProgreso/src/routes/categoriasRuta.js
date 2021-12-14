const categoriaControl = require ('../controllers/categoriasControl');
const { Router } = require ('express');
const router = Router();

router.get('/', categoriaControl.default.Consultar);
router.get('/search/:letra', categoriaControl.default.Buscar);
router.post('/', categoriaControl.default.Agregar);
router.put('/:id', categoriaControl.default.Modificar);
router.delete('/:id', categoriaControl.default.Eliminar);
router.put('/percentage/:id', categoriaControl.default.ModificarPorcentajes);

router.get('/stock/:id', categoriaControl.default.Categoriasproducto);

 exports.default =router;