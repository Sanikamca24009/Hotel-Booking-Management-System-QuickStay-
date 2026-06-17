import mongoose from "mongoose";
import "dotenv/config";
import Hotel from "./models/Hotel.js";
import Room from "./models/Room.js";
import User from "./models/User.js";

import connectDB from "./configs/db.js";

const run = async () => {
  await connectDB();
  const users = await User.find({});
  console.log("Users:", users.map(u => ({ id: u._id, email: u.email, role: u.role })));

  
  const hotels = await Hotel.find({});
  console.log("Hotels:", hotels);
  
  const rooms = await Room.find({});
  console.log("Rooms:", rooms);
  
  process.exit(0);
};

run();
