import express from 'express'
import { addNewUser } from '../controllers/controllers.api.users'

const app = express()
const router = express.Router()

// router.get('/', getAllUsers)
router.post('/', addNewUser)

export default router
