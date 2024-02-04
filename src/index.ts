import express from 'express';
import { userRouter } from '../routes/user.routes';
import cookieParser from 'cookie-parser';
const cors = require('cors');


require("dotenv").config();
const app = express();
app.use(cors());


// middlewares here
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.use("/users", userRouter);


app.listen(port,()=>{
    console.log(`Listening in Port ${port}`)
})