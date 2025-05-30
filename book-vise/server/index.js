import express from "express"
import corsMiddleware from "./configs/cors.config.js"
import connectDB from "./configs/db.config.js"
import dotenv from "dotenv"
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
dotenv.config()

const PORT = process.env.PORT || "5000"

const app = express()
app.use(corsMiddleware)
app.use(express.json())
app.use(authRouter)
app.use(userRouter)
app.use(express.urlencoded({ extended: true }));

connectDB()
app.get('/', (req, res) => {
	res.send("hello world")
})
app.listen(PORT, () => console.log(`running on point ${PORT}`))