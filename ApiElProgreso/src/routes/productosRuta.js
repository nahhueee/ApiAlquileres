const productoControl = require('../controllers/productosControl');
const { Router } = require ('express');
const router = Router();

router.get('/:id', productoControl.default.Consultar);
router.put('/search/:letra', productoControl.default.Buscar);
router.post('/', productoControl.default.Agregar);
router.put('/:id', productoControl.default.Modificar);
router.put('/add/:id', productoControl.default.AgregarCantidad);
router.delete('/:id', productoControl.default.Eliminar);
router.put('/discount/:id', productoControl.default.Descontar);
router.put('/reverse/:id', productoControl.default.Revertir);
router.get('/:id', productoControl.default.ObtenerProVenta);

 exports.default = router;