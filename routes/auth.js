// routes/auth.js
const express = require('express');
const User = require('../models/User'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();



router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Received registration request:', req.body); // Log the data received from frontend

  try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          console.log('User already exists:', email);
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
          username,
          email,
          password: hashedPassword,
      });

      // Save the user to the database
      await newUser.save();
      console.log('User registered successfully:', newUser);

      // Create a JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error during registration:', error.message); // Log the error message
        res.status(500).json({ message: 'Server error' });  // Send generic server error message to client
    }
});

// Login route (for demonstration, if needed)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Compare the passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
      
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;