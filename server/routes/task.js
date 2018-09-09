var express = require('express');
var router = express.Router();
var {isLogin} = require('../midlewares/isLogin');
var {insertTask, updateTask, getUncompleteTasks, removeTask, getCompleteTask, updateTaskDone, getTodayTask, reminder} = require('../controllers/task');

/* GET home page. */
router.post('/', isLogin, insertTask)
      .get('/', isLogin, getUncompleteTasks)
      .get('/complete', isLogin, getCompleteTask)
      .get('/reminder', isLogin, reminder)
      .get('/todaytask', isLogin, getTodayTask)
      .put('/:id', isLogin, updateTask)
      .put('/:id/complete', isLogin, updateTaskDone)
      .delete('/:id', isLogin, removeTask)

module.exports = router;
