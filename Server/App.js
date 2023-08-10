import  express  from "express";
import {config} from "dotenv";

//routes import
import testrouter from "./Routes/Test.js";



config({
    path:"./Config/config.env"
})

const app=express();

//middleware
app.use(express.json());


//routes
app.use("/test",testrouter);


export default app;
