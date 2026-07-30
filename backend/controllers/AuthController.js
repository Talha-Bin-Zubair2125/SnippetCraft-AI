const joi = require("joi");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");

const registerSchema = joi.object({
  username: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const updateProfileSchema = joi.object({
  username: joi.string().min(3).max(30),
  email: joi.string().email(),
  password: joi.string().min(6),
});

const registerUser = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, email, password } = req.body;
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.cookie("userId", user._id, { httpOnly: true, signed: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "lax", secure: false});
    res.status(200).json({ message: "Login successful"});
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("userId", { httpOnly: true, signed: true, sameSite: "lax", secure: false });
    res.status(200).json({ message: "Logout successful" });
  }
  catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { error } = updateProfileSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, email, password } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user: { username: user.username, email: user.email } });
  }
  catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
    
module.exports = { registerUser, loginUser, profile, logoutUser, updateProfile };
