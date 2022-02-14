const AlquilerControl  = require ('../controllers/alquileresController');
const { Router } = require ('express');
const router  = Router();

//router.get('/', cajasControl.Consultar);
router.get('/', AlquilerControl.default.ConsultarDestacados);
router.get('/all', AlquilerControl.default.ObtenerTodos);
router.put('/', AlquilerControl.default.ObtenerAlquileres);
router.put('/clicks', AlquilerControl.default.ObtenerClicks);

router.get('/:id', AlquilerControl.default.ConsultarDetalleAlquiler);
router.get('/services/:id', AlquilerControl.default.ConsultarServiciosAlquiler);
router.get('/galery/:id', AlquilerControl.default.ConsultarGaleriaAlquiler);
router.get('/rate/:id', AlquilerControl.default.ConsultarTarifaAlquiler);
router.get('/coments/:id', AlquilerControl.default.ConsultarReseñasAlquiler);
router.get('/gralraiting/:id', AlquilerControl.default.ConsultarTotalRaiting);
router.get('/condition/:id', AlquilerControl.default.ConsultarCondicionesAlquiler);

router.post('/postcoment', AlquilerControl.default.AgregarComentario);

router.put('/verify', AlquilerControl.default.ConsultarEmailComentario);
router.put('/related', AlquilerControl.default.ConsultarRelacionados);

 exports.default = router;