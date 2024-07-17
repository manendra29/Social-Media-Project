import express, { json } from "express";
import cors from "cors";
const app=express();
import helmet from "helmet";
import morgan, { format } from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
   dbName:"Social_Media"
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images',express.static(path.join(__dirname,'public/images')));


app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
    origin:"*",
    methods:['GET','PUT','DELETE','POST','PATCH']
}));

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"public/images");
    },
    filename: (req,file,cb)=>{
        console.log(file.originalname);
        // const name=Date.now()+file.originalname;
        cb(null,file.originalname);
    },
});


const upload=multer({storage : storage});
app.post("/api/upload",upload.single("file"),(req,res) =>{
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.log(error);
    }
})


app.use("/api/user",userRoute);
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`server is listening on ${process.env.PORT}`);
});
