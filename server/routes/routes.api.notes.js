var express = require('express');
var router = express.Router();
var noteControllers = require('../controllers/controllers.api.notes')

router.get('/seed', noteControllers.seedUserAndNote)
router.get('', noteControllers.getAllNotes)
router.get('/:id', noteControllers.getNoteById)
router.post('/', noteControllers.createNote)
router.put('/', noteControllers.updateNote)
router.delete('/all', noteControllers.deleteAllNotes)
router.delete('/all', noteControllers.deleteAllUsers)
router.delete('/', noteControllers.deleteNote)

module.exports = router;
