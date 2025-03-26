import mongoose from 'mongoose'

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI)
		console.log("mongo db connected successfully");

	} catch (error) {
		console.error("there was an error", error.message)
		process.exit(1)

	}

}
export default connectDB