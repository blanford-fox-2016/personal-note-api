'use strict'
const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

/* GET users listing. */
router.post('/login', auth.login);
router.post('/register', auth.register);

module.exports = router;
