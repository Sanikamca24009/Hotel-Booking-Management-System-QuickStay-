import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database Connected"));
    mongoose.connection.on("error", (err) => console.error("Database connection error:", err));

    const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/hotel-booking";
    console.log("Connecting to MongoDB at:", uri);
    await mongoose.connect(uri, {
      dbName: "hotel-booking",
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database Connected Successfully!");
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
  }
};

export default connectDB;