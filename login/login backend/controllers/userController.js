require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const authenticator = require("otplib").authenticator;
const qrcode = require("qrcode");
class UserController {
  async login(req, res) {
    const { username, password, otp } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      if (!otp) {
        return res.status(400).json({ msg: "OTP is required" });
      }
      if (!authenticator.check(otp, user.setupKey)) {
        return res.status(400).json({ msg: "Invalid OTP" });
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
    } catch (err) {
      res.status(500).json({ msg: "Internal server error" });
      console.log(err);
    }
  }
  async register(req, res) {
    try {
      const { username, password, email } = req.body;
      const user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      //generate a setup key for google authenticator
      const setupKey = authenticator.generateSecret();
      var newUser = new User({
        username,
        password: hashPassword,
        email,
        setupKey,
      });
      await newUser.save();
      //send email to user
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Welcome to the app",
        text: "Welcome to the app",
      };
      transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent");
        }
      });
      qrcode.toDataURL(authenticator.keyuri(email, "2FA Node App", setupKey), (err, url) => {
        if (err) throw err;
        res.status(200).json({ msg: "User created", qrcode: url, setupKey });
      });
    } catch (err) {
      res.status(500).json({ msg: "Internal server error" });
      console.log(err);
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
