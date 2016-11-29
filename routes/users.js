var express = require('express');
var router = express.Router();
var controller = require('../controller/user.controller')
/* GET users listing. */
router.post('/', controller.createUser)
router.get('/', controller.getAllUser)
router.get('/:id', controller.getOneUser)
router.put('/', controller.editUser)
router.delete('/', controller.deleteUser)

module.exports = router;
