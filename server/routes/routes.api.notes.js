var express = require('express');
var router = express.Router();
var noteControllers = require('../controllers/controllers.api.notes')

router.get('/seed', noteControllers.seedUserAndNote)
router.get('/', noteControllers.isAuthenticateToken, noteControllers.getAllNotes)
router.get('/:id', noteControllers.isAuthenticateToken, noteControllers.getNoteById)
router.post('/', noteControllers.isAuthenticateToken, noteControllers.createNote)
router.put('/', noteControllers.isAuthenticateToken, noteControllers.updateNote)
router.delete('/all', noteControllers.deleteAllNotes)
router.delete('/', noteControllers.isAuthenticateToken, noteControllers.deleteNote)

module.exports = router;
