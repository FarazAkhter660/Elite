import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
