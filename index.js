import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import User from './models/userModel.js';
// import fs from 'fs';

const app = express();
const PORT = 3000;


// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
async function initializeDatabase() {
  try {
    await mongoose.connect('mongodb+srv://91uttkarsh:Utkarsh%40123@cluster0.haabqcz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/userdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
    // const count = await User.countDocuments();
    // if (count === 0) {
    //   const data = JSON.parse(await fs.promises.readFile('./data.json', 'utf-8'));
    //   await User.insertMany(data);
    //   console.log('Data imported successfully');
    // } else {
    //   console.log('Data already exists, skipping import');
    // }
  } catch (error) {
    console.error('Error connecting to MongoDB or importing data', error);
  }
}


initializeDatabase();
// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/', async (req, res) => {
  try {
    res.status(200).send("Server Working properly ");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const user = await User.findOneAndUpdate({ id }, updates, { new: true });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndDelete({ id });
    if (user) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
