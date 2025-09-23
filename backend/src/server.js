// const express=require('express')
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import {connectdb} from "./lib/db.js"
dotenv.config()


const port=process.env.PORT
const app=express();
app.use(express.json());
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)


app.listen(port,()=>{console.log(`server is starting at:${port}`)
  connectdb();
})