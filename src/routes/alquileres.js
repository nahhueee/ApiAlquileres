const AlquilerControl  = require ('../controllers/alquileresComponent');
const { Router } = require ('express');
const router  = Router();

//router.get('/', cajasControl.Consultar);
router.get('/', AlquilerControl.default.ConsultarDestacados);
router.put('/', AlquilerControl.default.ObtenerAlquileres);

router.get('/:id', AlquilerControl.default.ConsultarDetalleAlquiler);
router.get('/services/:id', AlquilerControl.default.ConsultarServiciosAlquiler);
router.get('/galery/:id', AlquilerControl.default.ConsultarGaleriaAlquiler);
router.get('/rate/:id', AlquilerControl.default.ConsultarTarifaAlquiler);
router.get('/coments/:id', AlquilerControl.default.ConsultarReseñasAlquiler);

 exports.default = router;