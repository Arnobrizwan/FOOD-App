"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if MONGO_URI exists
        // if (!process.env.MONGO_URI) {
        //   throw new Error("MONGO_URI is not defined in the environment variables.");
        // }
        // Mongoose connection options
        // const options = {
        //   serverSelectionTimeoutMS: 5000, // Fail quickly if server is not found (5 seconds)
        //   connectTimeoutMS: 10000,       // Time to establish a connection (10 seconds)
        //   socketTimeoutMS: 45000,        // Wait time for server response after connecting (45 seconds)
        // };
        // Attempt to connect to MongoDB
        yield mongoose_1.default.connect("mongodb+srv://arnobrizwan23:XUcFYxRYj5J3OgLd@cluster0.xr6hb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("✅ MongoDB connected successfully!");
    }
    catch (error) {
        console.error("❌ Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure status
    }
});
exports.default = connectDB;
