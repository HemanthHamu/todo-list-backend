import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    text: String,
    done: Boolean,
    timestamp: Date
  });
  
const Task = mongoose.model('Task', taskSchema);
export default Task;