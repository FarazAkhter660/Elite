import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transactionRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
