import express from 'express'
import {
  getAllUsers,
  getUserById,
  addNewUser,
  deleteAllUsers
} from '../controllers/controllers.api.users'

const app = express()
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', addNewUser)
router.delete('/', deleteAllUsers)

export default router
