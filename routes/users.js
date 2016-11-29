var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller')
var User = require('../models/user.model')
/* GET users listing. */
router.post('/', controller.createUser);
router.get('/', controller.getAllUser)
router.put('/', controller.editUser)
router.delete('/', controller.deleteUser)

module.exports = router;
