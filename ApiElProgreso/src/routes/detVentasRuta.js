const detVentasControl = require('../controllers/detVentasControl');
const { Router } = require('express');
const router  = Router();

router.post('/', detVentasControl.default.Agregar);
router.get('/:id', detVentasControl.default.Consultar);
router.get('/cash/:id', detVentasControl.default.ConsultarDeCaja);
router.get('/productskg/:id', detVentasControl.default.ConsultarProductosElegidosKg);
router.get('/productsuni/:id', detVentasControl.default.ConsultarProductosElegidosUni);

router.get('/detventacaja/:id', detVentasControl.default.ConsultarDetVentasCaja);
router.put('/detCategory/', detVentasControl.default.ConsultarDetVentasCategoria);

 exports.default = router;