import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
