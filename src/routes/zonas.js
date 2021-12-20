const ZonaControl  = require ('../controllers/zonasController');
const { Router } = require ('express');
const router  = Router();

router.get('/', ZonaControl.default.ConsultarZonas);
router.get('/det/:id', ZonaControl.default.ConsultarDetalleZona);
router.get('/rentals/:id', ZonaControl.default.ConsultarAlojamientos);

 exports.default = router;