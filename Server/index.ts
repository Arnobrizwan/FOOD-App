import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./db/connectDB";

const PORT = process.env.PORT || 4000;

const app = express();

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening at port ${PORT}`);
});