const estadisticaControl = require('../controllers/estadisticasControl');
const { Router } = require('express');
const router = Router();

router.put('/', estadisticaControl.default.Consultar);
router.put('/details/', estadisticaControl.default.ConsultarDetalle);
router.put('/cash/', estadisticaControl.default.ConsultarCajas);
 exports.default = router;