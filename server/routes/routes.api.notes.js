import express from 'express'
import {
  getNoteById,
  addNewNote,
  editNote,
  deleteNote
} from '../controllers/controllers.api.notes'

const app = express()
const router = express.Router()

router.get('/:id', getNoteById)
router.post('/', addNewNote)
router.put('/', editNote)
router.delete('/', deleteNote)

export default router
