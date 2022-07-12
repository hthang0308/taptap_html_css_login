require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

class UserController {
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = {
      user: {
        id: user.id,
        username: user.username,
      },
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  }
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      const newUser = new User({
        username,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();
      res.status(200).json({ msg: "User created" });
    } catch (err) {
      res.status(500).json({ msg: "Internal server error" });
    }
  }
  async changePassword(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ msg: "Password changed" });
  }
}
module.exports = new UserController();
