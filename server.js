const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const errorMiddleware = require('./middleware/errorMiddleware');
const notesRoutes = require('./routes/noteRoute');
const authRoutes = require('./routes/authRoute');

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONG, { 
  
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// CORS middleware - Allow requests from http://localhost:3000

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Mount authRoutes
app.use('/api/auth', authRoutes);

// Mount notesRoutes
app.use('/api/notes', notesRoutes);

// Error handling middleware - should be the last middleware in chain
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
