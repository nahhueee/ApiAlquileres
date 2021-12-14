const ZonaControl  = require ('../controllers/zonasController');
const { Router } = require ('express');
const router  = Router();

router.get('/', ZonaControl.default.ConsultarZonas);
router.get('/det/:id', ZonaControl.default.ConsultarDetalleZona);

 exports.default = router;