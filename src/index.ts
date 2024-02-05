import express from 'express';
import { userRouter } from '../routes/user.routes';
import cookieParser from 'cookie-parser';
import { PORT } from './utilities/envs';

const app = express();
const cors = require('cors');




app.use(cors());


// middlewares here
app.use(express.json());
app.use(cookieParser());

const port = PORT || 3000;
console.log(port)
app.use("/users", userRouter);


app.listen(3000,()=>{
    console.log(`Listening in Port ${port}`)
})