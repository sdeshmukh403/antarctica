var express = require('express');
var app = express();
var router = express.Router();
let homeController = require('../controller/HomeController');
let authController = require('../controller/AuthController');


/* GET home page. */

router.all('*', authController.checkLogined);

//auth
router.get('/', authController.getDashboard);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);
router.get('/signup', authController.getSignup);
router.post('/signup', authController.postSignup);

//home
router.get('/home', homeController.renderHomePage);
router.all('/user-list/:page_no?', homeController.getUserList );

module.exports = router;
