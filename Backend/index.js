import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app =express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello")
})
const port =  process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})