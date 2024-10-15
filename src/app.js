import express,{Router} from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static("public"))
app.use(cookieParser());

app.get("/",(req,res)=>{res.send("Test succesfull")})

import userRouter from "../routes/user.route.js"

app.use("/user",userRouter);

// app.listen(8000,()=>console.log("listening on port 8000"))

export default app;