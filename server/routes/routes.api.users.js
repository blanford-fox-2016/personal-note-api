var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/controllers.api.users')

router.get('/seed', userControllers.seedUser)
router.get('', userControllers.getAllUsers)
router.get('/:id', userControllers.getUserById)
router.post('/', userControllers.createUser)
router.put('/', userControllers.updateUser)
router.delete('/all', userControllers.deleteAllUsers)
router.delete('/', userControllers.deleteUser)

module.exports = router;
