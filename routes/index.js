const Router = require('koa-router');
const koaBody = require('koa-body');
const config = require('../config');
const indexController = require('../controllers/index');
const loginController = require('../controllers/login');
const adminController = require('../controllers/admin');

const router = new Router();


router.get('/', indexController.get);
router.post('/', koaBody(), indexController.post);

router.get('/login', loginController.get);
router.post('/login', koaBody(),  loginController.postAuthorization);

router.get('/admin', adminController.get);
router.post('/admin/skills',koaBody(), adminController.updateSkills);
router.post('/admin/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: process.cwd() + config.upload.path
  },
  formLimit: 1000000
}), adminController.uploadProduct);

module.exports = router;
