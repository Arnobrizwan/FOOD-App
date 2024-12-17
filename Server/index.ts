import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
const app = express();

const PORT =process.env.PORT || 3009;
console.log("Loaded PORT:", process.env.PORT); // Debugging line
app.listen(PORT, () =>{
    console.log(`Server listen at port ${PORT}`);
})