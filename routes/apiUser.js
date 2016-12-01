'use strict'
const express = require('express');
const router = express.Router();
const apiUser = require('../controllers/apiUserController');

/* GET users listing. */
router.get('/', apiUser.getAllUsers);
router.get('/:username', apiUser.getUserByUsername);
router.put('/:id', apiUser.editUserById);
router.delete('/:id', apiUser.deleteUserById);

module.exports = router;
