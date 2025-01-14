import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './utils/database.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRouter.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', userRouter);

connectToDB()
    .then(() => {
        console.log("Database connected!")
        app.listen(PORT, () => {
            console.log(`server started at PORT:${PORT}`)
        })
    })
    .catch((error) => {
        console.log("Failed to connect to DB");
        throw new Error(error);
    })

