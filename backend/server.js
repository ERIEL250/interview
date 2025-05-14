const express = require('express');
//const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json

// MongoDB Connection
const connectDB = require('./config/db');
connectDB();
// Route imports
const userRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const resultRoutes = require('./routes/resultRoutes');
const candidateRoutes = require('./routes/candidates');
const authMiddleware = require('./middlewares/authMiddleware');

// Route mounting
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/candidates', candidateRoutes);
app.use('/results', resultRoutes);

// Root endpoint (optional)
app.get('/', (req, res) => {
  res.send('Cafe Camellia Recruitment API is running');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
