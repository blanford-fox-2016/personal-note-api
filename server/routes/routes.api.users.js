var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/controllers.api.users')

router.get('/users/seed', userControllers.seedUser)
router.get('/users', userControllers.getAllUsers)
router.get('/users/:id', userControllers.getUserById)
router.post('/users', userControllers.createUser)
router.update('/users', userControllers.updateUser)
router.delete('/users/all', userControllers.deleteAllUsers)
router.delete('/users', userControllers.deleteUser)

module.exports = router;
