require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const authenticateToken = require('./middleware/auth');

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { promisify } = require('util');
const randomBytesAsync = promisify(crypto.randomBytes);
// const addSamplePosts = require('./addSamplePosts');

const session=require("express-session")
const passport = require("passport")
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const clientid = process.env.GOOGLE_OAUTH_CLIENT_ID;
const clientsecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: ["https://mern-frontend-lac.vercel.app/", "http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
  }
));

const secretKey = process.env.JWT_SECRET;
const saltRounds = 10;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
  // addSamplePosts();
}).catch(error => {
  console.error("MongoDB connection error:", error);
});

app.get("/", (req, res) => {
  res.json({
    message: "A sample API for login"
  });
});

app.post("/signup", async (req, res) => {
  const { username, email, password, name } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      name
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

app.get('/posts', authenticateToken, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  
  try {
    const posts = await Post.find({}).skip(skip).limit(limit);
    res.json({ posts });
  } catch (error) {
    console.error('Posts error:', error);
    res.status(401).json({ message: 'Unauthorized access', error: error.message });
  }
});

// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   try {
//     User.findOne({ email: email});
// .then(user =>{
//   if (!user) {
//     return res.send({Status: "User doesn't exist!!"})
//   }
//   const token = jwt.sign({id: user._id}, secretKey, {expiresIn: "1d"})
// })

// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const buffer = await randomBytesAsync(20);
//     const resetToken = buffer.toString('hex');

//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//     await user.save();

//     const transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     const mailOptions = {
//       to: email,
//       from: process.env.EMAIL_USER,
//       subject: 'Password Reset',
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//         Please click on the following link, or paste this into your browser to complete the process:\n\n
//         http://${req.headers.host}/reset/${resetToken}\n\n
//         If you did not request this, please ignore this email and your password will remain unchanged.\n`
//     };

//     transporter.sendMail(mailOptions, (err) => {
//       if (err) {
//         console.error('Error sending email:', err);
//         return res.status(500).json({ message: 'Error sending email' });
//       }
//       res.status(200).json({ message: 'Password reset link sent!' });
//     });
//   } catch (error) {
//     console.error('Forgot password error:', error);
//     res.status(500).json({ message: 'Failed to send password reset link' });
//   }
// });


// app.get('/reset/:token', async (req, res) => {
//   try {
//     const user = await User.findOne({
//       resetPasswordToken: req.params.token,
//       resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
//     }

//     res.status(200).json({ message: 'Valid token', userId: user._id });
//   } catch (error) {
//     res.status(500).json({ message: 'Error finding user' });
//   }
// });

// app.post('/reset/:token', async (req, res) => {
//   try {
//     const user = await User.findOne({
//       resetPasswordToken: req.params.token,
//       resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
//     }

//     user.password = await bcrypt.hash(req.body.password, saltRounds);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).json({ message: 'Password has been reset' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error resetting password' });
//   }
// });

// setup session
app.use(session({
  secret: secretKey,
  resave: "false",
  saveUninitialized: true
}))
//setup passport
app.use(passport.initialize());
app.use(passport.session());


const generateRandomPassword = () => {
  // length of the random password
  const length = 10;

  // random buffer of bytes
  const buffer = crypto.randomBytes(length);

  // buffer to a hex string
  const randomPassword = buffer.toString('hex');

  return randomPassword;
};

passport.use(
  new OAuth2Strategy({
    clientID: clientid,
    clientSecret: clientsecret,
    callbackURL: "/auth/google/callback",
    scope:["profile", "email"]
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleID: profile.id });
      if (!user) {
        const { givenName, familyName } = profile.name;
        const fullName = `${givenName} ${familyName}`; // Concatenate givenName and familyName
        const username = profile.emails[0].value; // Use the first email in the emails array as the username

        // random password 
        const password = generateRandomPassword();

        user = new User({
          username: username,
          name: fullName,
          email: profile.emails[0].value,
          password: password,
          googleID: profile.id
        });
        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  })
);


passport.serializeUser((user, done)=>{
  done(null, user);
})
passport.deserializeUser((user,done)=>{
  done(null,user);
})
//initial google oauth login
app.get("/auth/google", passport.authenticate("google",{scope:["profile", "email"]}))

app.get("/auth/google/callback", passport.authenticate("google",{
  successRedirect:"http://localhost:5173/posts",
  failureRedirect:"http://localhost:5173/signup"
}))

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
