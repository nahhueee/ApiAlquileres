const ComidaControl  = require ('../controllers/comidaController');
const { Router } = require ('express');
const router  = Router();

router.get('/delivery/', ComidaControl.default.ConsultarDelivery);

 exports.default = router;