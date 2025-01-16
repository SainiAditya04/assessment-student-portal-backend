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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use('/uploadImage', upload.single("assignment"), async (req, res) => {
//     try {
//         const localFilePath = req.file.path;
//         const response = await uploadFileToCloudinary(localFilePath);
//         fs.unlinkSync(localFilePath);

//         console.log(response.public_id);

//         return res.status(200).json({
//             response,
//         });
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message,
//         });
//     }
// })

// app.use('/deleteImage', async (req, res) => {
//     try {
//         const user = req.user;
//         // delete the user from the DB
//         // then delete file from cloudinary
//         await deleteFileFromCloudinary(user.filePublicId);
//     } catch (error) {
//         return res.status(400).json({
//             message: error.message
//         })
//     }
// })

app.use('/api/v1', userRouter);

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

