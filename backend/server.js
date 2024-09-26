import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
