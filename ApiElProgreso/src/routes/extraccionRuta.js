const extraccionControl  = require ('../controllers/extraccionControl');
const { Router } = require ('express');
const router = Router();

router.post('/', extraccionControl.default.Agregar);
router.get('/:id', extraccionControl.default.Consultar);
router.delete('/:id', extraccionControl.default.Eliminar);

 exports.default = router;