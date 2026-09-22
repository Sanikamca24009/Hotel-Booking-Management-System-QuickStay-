import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  try {
    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hotel-booking";
    console.log("Connecting to MongoDB at:", uri);
    const conn = await mongoose.connect(uri, {
      dbName: "hotel-booking",
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = conn.connections[0].readyState === 1;
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    throw error;
  }
};

export default connectDB;