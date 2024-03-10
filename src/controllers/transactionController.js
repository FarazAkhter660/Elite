import Transaction from '../models/Transaction.js';

// Controller for handling transactions
export const createTransaction = async (req, res) => {
  try {
    // Extract transaction data from request body
    const { type, amount, description } = req.body;

    // Create a new transaction
    const transaction = new Transaction({
      type,
      amount,
      description,
      user: req.user._id // Assuming user ID is stored in req.user after authentication
    });

    // Save the transaction to the database
    await transaction.save();

    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTransactions = async (req, res) => {
  try {
    // Retrieve transactions for the authenticated user
    const transactions = await Transaction.find({ user: req.user._id });

    res.status(200).json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    // Extract transaction ID from request params
    const { id } = req.params;

    // Find and delete the transaction
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).json({ message: 'Transaction deleted successfully', transaction: deletedTransaction });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
