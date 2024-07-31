import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import connectToMongoDB from './Database/connectToMongoDB.js';
const app = express();
const PORT = process.env.PORT || 5000;
import Task from './Database Schema/TodoModel.js';

// Middleware
//THIS CORS LIBRARY ALLOWS REQUESTS FROM DIFFERENT DOMAINS
app.use(cors());
app.use(express.json());

// Routes

//THIS IS AN ENDPOINT FOR SENDING THE AVAILABLE TASKS TO FRONTEND
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//THIS IS AN ENDPOINT FOR STORING THE TODOS ENTERED BY USER FROM FRONTEND
app.post('/tasks', async (req, res) => {
  const { text } = req.body;
  const newTask = new Task({ text, done: false, timestamp: new Date() });
  try {
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//THIS IS AN ENDPOINT TO UPDATE THE EXISTING TODO
app.put('/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//THIS IS AN ENDPOINT FOR DELETING THE TODO
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToMongoDB()
});
