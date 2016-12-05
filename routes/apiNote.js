'use strict'
const express = require('express');
const router = express.Router();
const apiNote = require('../controllers/apiNoteController');

/* GET users listing. */
router.post('/', apiNote.createNote);
router.get('/', apiNote.getAllNotes);
router.get('/:slug', apiNote.getNoteBySlug);
router.put('/:id', apiNote.editNoteById);
router.delete('/:id', apiNote.deleteNoteById);

module.exports = router;
