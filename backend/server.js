import express from "express";
import path from 'path'
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js';

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
// const port = 5000;


connectDB();
const port = process.env.PORT || 5000;
const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));
    //routes that are not api will be redirected to index.html

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}
else {

    app.get('/', (req, res) => {
        res.send("APi is running ...")
    })
}




app.use(notFound);
app.use(errorHandler);





app.listen(port, () => console.log(`server is running on ${port}`))
