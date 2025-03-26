import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ success: false, message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Wrong password" });
  }

  return res.status(200).json({ success: true, message: "Successful login" });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  const existingUser = await User.findOne({email})
  if (existingUser) {
	return res.status(400).json({success: false, message: "Email already exists"})
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword });

  await user.save();
  return res.status(201).json({ success: true, message: "User registered successfully" });
};

export { loginUser, registerUser };
