var express = require('express');
var router = express.Router();
var {isLogin} = require('../midlewares/isLogin');
var {getWeather} = require('../controllers/weather');

/* GET home page. */
router.get('/', isLogin, getWeather)

module.exports = router;
