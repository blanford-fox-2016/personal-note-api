var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/controllers.api.users')

router.get('/seed', userControllers.seedUser)
router.get('/', userControllers.isAuthenticateToken, userControllers.getAllUsers)
router.get('/:id', userControllers.isAuthenticateToken, userControllers.getUserById)
router.post('/', userControllers.createUser)
router.post('/login', userControllers.loginUser)
router.put('/', userControllers.isAuthenticateToken, userControllers.updateUser)
router.delete('/all', userControllers.deleteAllUsers)
router.delete('/', userControllers.isAuthenticateToken, userControllers.deleteUser)

module.exports = router;
