const pagosControl = require ('../controllers/pagosControl');
const { Router } = require('express');
const router = Router();

router.post('/', pagosControl.default.Agregar);
router.get('/:id', pagosControl.default.Consultar);
router.put('/:id', pagosControl.default.Eliminar);

 exports.default = router;