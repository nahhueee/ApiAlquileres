const cajasControl = require('../controllers/cajasControl');
const { Router } = require('express');
const router = Router();

router.get('/actives', cajasControl.default.ConsultarActivas);
router.get('/lastid', cajasControl.default.UltimaCaja);
router.get('/totals/:id', cajasControl.default.ConsultarTotales);
router.get('/comparative/:id', cajasControl.default.ConsultarComparativa);
router.get('/details/:id', cajasControl.default.ConsultarDetalles);
router.get('/:id', cajasControl.default.Consultar);

router.post('/', cajasControl.default.Agregar);
router.put('/:id', cajasControl.default.Modificar);
router.put('/close/:id', cajasControl.default.Finalizar);
router.put('/open/:id', cajasControl.default.Revertir);
router.put('/search/:letra', cajasControl.default.Buscar);
router.delete('/:id', cajasControl.default.Eliminar);

exports.default = router;