const ZonaControl  = require ('../controllers/zonasController');
const { Router } = require ('express');
const router  = Router();

router.get('/', ZonaControl.default.ConsultarZonas);
router.get('/det/:id', ZonaControl.default.ConsultarDetalleZona);
router.get('/rentals/:id', ZonaControl.default.ConsultarAlojamientos);
router.get('/galery/:id', ZonaControl.default.ConsultarGaleria);

 exports.default = router;