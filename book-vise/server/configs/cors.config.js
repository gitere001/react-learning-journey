import cors from "cors"
const corsOptions = {
	origin: process.env.CLIENT_URL || "http://localhost:5173",
	optionsSuccessStatus: 200,
}

export default cors(corsOptions)