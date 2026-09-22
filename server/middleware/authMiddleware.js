import User from "../models/User.js";
import mongoose from "mongoose";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth || {};
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: "Database is not connected. Please check your MongoDB connection string or resume your MongoDB Atlas cluster.",
      });
    }

    let user = await User.findById(userId);
    if (!user) {
      user = await User.create({
        _id: userId,
        email: "user@example.com",
        username: "User",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
        role: "user",
        recentSearchedCities: [],
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};