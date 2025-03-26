import express from "express"

import { registerUser, loginUser } from "../controllers/authController.js"
const authRouter = express.Router()
authRouter.post('/register-user', registerUser)
authRouter.post('/login-user', loginUser)

export default authRouter