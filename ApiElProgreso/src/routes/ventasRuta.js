const ventasControl  = require ('../controllers/ventasControl');
const { Router } = require ('express');
const router  = Router();

//router.get('/', cajasControl.Consultar);
router.get('/lastid', ventasControl.default.UltimaVenta);
router.post('/', ventasControl.default.Agregar);
router.get('/:id', ventasControl.default.Consultar);
router.delete('/:id', ventasControl.default.Eliminar);

 exports.default = router;