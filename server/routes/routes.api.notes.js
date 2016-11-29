import express from 'express'
import {
  getNoteById,
  addNewNote
} from '../controllers/controllers.api.notes'

const app = express()
const router = express.Router()

router.get('/', getNoteById)
router.post('/', addNewNote)
// router.put('/', editUser)
// router.delete('/', deleteUser)
// router.delete('/', deleteAllUsers)

export default router
