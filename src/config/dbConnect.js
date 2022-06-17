import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.MONGODB_KEY);

let db = mongoose.connection;

export default db;