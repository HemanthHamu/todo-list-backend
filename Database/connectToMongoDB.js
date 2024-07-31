import mongoose from "mongoose";

async function connectToMongoDB(){
   await mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
}

export default connectToMongoDB