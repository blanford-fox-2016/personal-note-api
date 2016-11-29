var express = require('express');
var router = express.Router();
var controller = require('../controller/note.controller')
/* GET users listing. */
router.post('/', controller.addNote)
router.get('/', controller.showAllNotes)
router.get('/:id', controller.getNoteById)
router.put('/:id', controller.editNote)
router.delete('/:id', controller.deleteNote)

module.exports = router;
