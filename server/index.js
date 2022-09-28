import express from 'express';
import dotenv from "dotenv";
import connectDatabase from './config/MongoDB.js';
import ImportData from './Dataimport.js';
import productRoute from './routes/ProductRoutes.js';
import userRoute from './routes/UserRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import { errorHandler, notFound } from './middleware/Error.js';

// Initialize packages
const app = express()

dotenv.config();

// connect database
connectDatabase();

app.use(express.json());

// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Howdy developer, server running on port ${PORT}`));