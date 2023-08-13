import  express  from "express";
import {config} from "dotenv";
import cors from "cors";
//routes import
import testrouter from "./Routes/Test.js";
import apirouter from "./Routes/api-data.js"


config({
    path:"./Config/config.env"
})

const app=express();

//middleware
app.use(express.json());
app.use(cors());


//routes
app.use("/test",testrouter);
app.use("/api/data",apirouter);


export default app;
