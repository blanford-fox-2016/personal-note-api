import express from 'express'
import {
  getAllUsers,
  getUserById,
  addNewUser,
  editUser,
  deleteUser,
  deleteAllUsers
} from '../controllers/controllers.api.users'

const app = express()
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', addNewUser)
router.put('/', editUser)
router.delete('/', deleteUser)
router.delete('/deleteall', deleteAllUsers)

export default router
