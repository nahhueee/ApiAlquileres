const MailControl  = require ('../controllers/mailsController');
const { Router } = require ('express');
const router  = Router();

router.post('/', MailControl.default.EnviarEmail);
router.post('/new', MailControl.default.EnviarDatos);

 exports.default = router;