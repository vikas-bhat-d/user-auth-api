import connectDB from "./db/dbConnection.js"
import app from "./src/app.js";

import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
})

const connectionInstance=connectDB().then(()=>{
    console.log("connected sucessfully");        

    app.listen(process.env.PORT||8000,()=>{
        console.log("listening at port ",process.env.PORT || 3000)
    })
    // User.insertMany([{username:'vikasBhatd',email:'01234'}])
    
}
)
.catch((err)=>{
console.log("MongoDB error: ",err);
})





