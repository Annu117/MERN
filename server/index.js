require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const authenticateToken = require('./middleware/auth');

const app = express();
app.use(express.json());
app.use(cors());

const secretKey = process.env.JWT_SECRET;
const saltRounds = 10;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get("/", (req, res) => {
  res.json({
    message: "A sample API for login"
  });
});

app.post("/signup", async (req, res) => {
  const { username, email, password, name, profilePicture } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name,
      profilePicture
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn: '1d' });
    res.json({ message: 'Success', token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("Password valid:", isPasswordValid); 

      if (isPasswordValid) {
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1d' });
        return res.json({ message: "Success", token });
      } else {
        return res.status(401).json({ message: "Incorrect Password" });
      }
    } else {
      return res.status(404).json({ message: "No record exists" });
    }
  } catch (error) {
      console.error("Login error:", error); 
      return res.status(500).json({ message: "Login failed" });  }
});

app.get("/posts", authenticateToken, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    const posts = await Post.find({}).limit(10); 
    res.json(posts);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
