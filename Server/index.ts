import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import path from "path";
import morgan from "morgan";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const DIRNAME = path.resolve();

// default middleware for any mern project
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:5174",
    credentials: true,
}

app.options('*', cors());
// app.use(cors(corsOptions));
app.use(cors({ origin: '*' }));
morgan.token('type', function (req, res) { return req.headers['content-type'] })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

// app.use(express.static(path.join(DIRNAME, "/client/dist")));
// app.use("*", (_, res) => {
//     res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
// });


app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server listen at port ${PORT}`);
});