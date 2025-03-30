import express from 'express'
import { fetchUser } from '../controllers/userController.js'

const userRouter = express.Router()
userRouter.post('/get-user', fetchUser)
export default userRouter