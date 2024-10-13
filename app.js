require('module-alias/register');  // Ensure module-alias is registered
require('dotenv').config();  // Load environment variables from .env

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('routes/userRoutes');  // Absolute path
const empRoutes = require('routes/empRoutes');    // Absolute path

const app = express();  // Define the app object here

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/v1/user', userRoutes);  // User routes
app.use('/api/v1/emp', empRoutes);    // Employee routes

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
