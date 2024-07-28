const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Signup handler
const signup = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ email, password: hashedPassword });
    await user.save();
    
    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    if (error.code === 11000) {
      console.error('Duplicate email error:', error);
      res.status(400).send({ message: 'Email already exists' });
    } else {
      console.error('Error creating user:', error);
      res.status(500).send({ message: 'Error creating user', error });
    }
  }
};

// Login handler
const login = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', { email, password });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email);
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate token
    const token = generateToken(user);
    
    // Send token to client
    res.json({ token });
    console.log(token)
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { signup, login };
