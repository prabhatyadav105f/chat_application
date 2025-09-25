// const express=require('express')
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import {connectdb} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
dotenv.config()


const port=process.env.PORT
const app=express();
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


app.listen(port,()=>{console.log(`server is starting at:${port}`)
  connectdb();
})