import  express  from "express";
import {config} from "dotenv";
import cors from "cors";
//routes import
import testrouter from "./Routes/Test.js";
import apirouter from "./Routes/api-data.js"
import regrouter from "./Routes/userRoute.js"
import uploadroute from "./Routes/ProcessRoute.js"

import ErrorMiddleware from "./middleware/Error.js";
import cookieParser from "cookie-parser";



config({
    path:"./Config/config.env"
})

const app=express();

//middleware
app.use(express.json());
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(cookieParser());


//routes
app.use("/test",testrouter);
//app.use("/api/data",apirouter);
app.use("/api/data",regrouter)
app.use("/api/data",uploadroute)

export default app;

app.use(ErrorMiddleware)