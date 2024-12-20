import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Check if MONGO_URI exists
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    // Mongoose connection options
    // const options = {
    //   serverSelectionTimeoutMS: 5000, // Fail quickly if server is not found (5 seconds)
    //   connectTimeoutMS: 10000,       // Time to establish a connection (10 seconds)
    //   socketTimeoutMS: 45000,        // Wait time for server response after connecting (45 seconds)
    // };

    // Attempt to connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully!");
  } catch (error: any) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure status
  }
};

export default connectDB;





