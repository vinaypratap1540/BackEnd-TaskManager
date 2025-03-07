import express from "express"
import dotenv from "dotenv"
import dbConnect from "./database/dbConnect.js"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js"
import cors from "cors"
dotenv.config({
    path:"./.env"
})
const app = express()
app.use(cors({
   origin:"https://frontend-taskmanager-wbe3.onrender.com",
   credentials:true,
   methods: ["GET", "POST", "PATCH", "DELETE"], // Explicitly allow methods
   allowedHeaders: ["Content-Type", "Authorization"], // Allow headers
}))
app.use(express.json())
app.use(cookieParser())
dbConnect()
.then(()=>{app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is listening ${process.env.PORT}`)
 })
})
.catch((error)=>{
    console.log("MongoDB Connecion Failed",error)
})

app.use("/api/v1/users",userRoute)
