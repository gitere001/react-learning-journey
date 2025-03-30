import User from "../models/user.model.js";
export async function fetchUser(req, res) {
	const { email } = req.body
	console.log(req.body);
	if (!email) {
		return res.status(400).json({ success: false, message: "email is required" })
	}
	try {
		const user = await User.findOne({ email }).select("username email image");
		if (!user) {
			return res.status(400).json({ success: false, message: "user not found" })

		}
		return res.status(201).json({ success: true, data: user })

	} catch (error) {
		console.log("error is ", error);
		return res.status(500).json({ success: false, message: "error happened" })

	}

}
