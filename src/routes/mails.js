const MailControl  = require ('../controllers/mailsController');
const { Router } = require ('express');
const router  = Router();

router.post('/', MailControl.default.EnviarEmail);

 exports.default = router;