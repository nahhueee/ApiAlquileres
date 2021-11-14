const AlquilerControl  = require ('../controllers/alquileresComponent');
const { Router } = require ('express');
const router  = Router();

//router.get('/', cajasControl.Consultar);
router.get('/', AlquilerControl.default.ConsultarDestacados);

 exports.default = router;