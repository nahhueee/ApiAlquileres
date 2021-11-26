const AlquilerControl  = require ('../controllers/alquileresComponent');
const { Router } = require ('express');
const router  = Router();

//router.get('/', cajasControl.Consultar);
router.get('/', AlquilerControl.default.ConsultarDestacados);
router.put('/', AlquilerControl.default.ObtenerAlquileres);

 exports.default = router;