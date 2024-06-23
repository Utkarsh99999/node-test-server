import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import User from './models/userModel.js';
import fs from 'fs';

const app = express();
const PORT = 3000;


// Middleware
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3001',
  // origin: 'https://next-table-psi.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));

// Connect to MongoDB
async function initializeDatabase() {
  try {
    await mongoose.connect('mongodb+srv://91uttkarsh:Utkarsh%40123@cluster0.haabqcz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    // console.log('Connected to MongoDB');
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


app.get('/', async (req, res) => {
  try {
    res.status(200).send("Server Working properly ");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/update/user', async (req, res) => {
  try {
    const users = await User.findOneAndUpdate({_id:req.body._id},req.body);
    return res.status(200).json({message:"User Updated",status:true});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
   return res.status(200).json({users:users});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete user by ID
app.post('/users/delete', async (req, res) => {
  try {
    const user = await User.deleteOne({ _id:req.body_id});
    if (user) {
      res.status(200).json({ message: 'User deleted successfully',status:true });
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
