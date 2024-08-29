import 'express-async-errors'
import express from 'express';
import morgan from "morgan";
import * as dotenv from 'dotenv';
import authRouter from "./routes/authRouter.js";

import cookieParser from "cookie-parser";

import mongoose from "mongoose";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import recipeRouter from "./routes/recipeRouter.js";
import {authenticateUser} from "./middleware/authMiddleware.js";
import cors from 'cors';

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


dotenv.config();
app.use(cookieParser());
app.use(express.json());
// app.use(errorHandlerMiddleware)
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/recipe',authenticateUser ,recipeRouter)




app.use(errorHandlerMiddleware)
// connect to mongoose
try {
    await mongoose.connect(process.env.MONGO_URL)

    const port = process.env.PORT || 5100;
    app.listen(port, () => {
        console.log(`Server running on port ${port}...`);
    })
} catch (error){
    console.log(error)
    process.exit(1)
}
