const userControl = require('../controllers/usuariosControl');
const { Router } = require('express');
const router = Router();

router.put('/', userControl.default.Ingresar);
router.get('/:usuario', userControl.default.VerificarUsuario);
router.post('/', userControl.default.Agregar);
router.put('/:id', userControl.default.Modificar);
router.delete('/:id', userControl.default.Eliminar);
router.get('/', userControl.default.Consultar);

exports.default = router;