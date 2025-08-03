import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import router from "./router/router.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api",router)


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
