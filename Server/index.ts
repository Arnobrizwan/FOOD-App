import express from "express";
const app = express();

const PORT =process.env.PORT || 3009;
app.listen(PORT, () =>{
    console.log(`Server listen at port ${PORT}`);
})