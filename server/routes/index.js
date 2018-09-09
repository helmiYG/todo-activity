var express = require('express');
var router = express.Router();
var {register, signin, signFb} = require('../controllers/user');

/* GET home page. */
router.post('/', register)
      .post('/signin', signin)
      .post('/signin/facebook', signFb)

module.exports = router;
