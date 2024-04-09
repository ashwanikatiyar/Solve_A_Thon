// src/controllers/authController.js

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


// SignUp
exports.signup = async (req, res) => {
  try {
    const { name, age, address, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      age,
      address,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Login
// exports.login = async (req, res) => {
//     try {
//       const { name, password } = req.body;
  
//       // Check if the user exists
//       const user = await User.findOne({ name });
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       console.log(user)
//       // Validate password
//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       console.log('Password valid:', isPasswordValid)
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Invalid password' });
//       }
  
//       // Generate JWT token
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//       console.log('Token:', token);
  
//       res.status(200).json({ token });
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   };


exports.login = async (req, res) => {
    try {
      const { name, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ name });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log('User:', user); // Debugging statement
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('Password:', password); // Debugging statement
      console.log('Hashed Password:', user.password); // Debugging statement
      console.log('Password valid:', isPasswordValid); // Debugging statement
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log('Token:', token); // Debugging statement
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  