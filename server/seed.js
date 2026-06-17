import mongoose from "mongoose";
import "dotenv/config";
import Hotel from "./models/Hotel.js";
import Room from "./models/Room.js";
import connectDB from "./configs/db.js";

const ownerId = "user_38UGLHeOIViLAQ998ZhZjBp9LbZ";

const hotelsData = [
  { name: "The Grand Plaza", address: "45 Broadway Ave", contact: "1112223333", owner: ownerId, city: "New York" },
  { name: "Royal London Suites", address: "10 Downing Street", contact: "4445556666", owner: ownerId, city: "London" },
  { name: "Marina Bay Resort", address: "10 Bayfront Ave", contact: "7778889999", owner: ownerId, city: "Singapore" },
  { name: "Burj Al Arab Luxury", address: "Jumeirah St", contact: "0001112222", owner: ownerId, city: "Dubai" },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear old seeded data
    const existingHotels = await Hotel.find({ owner: ownerId });
    const existingHotelIds = existingHotels.map(h => h._id);
    await Room.deleteMany({ hotel: { $in: existingHotelIds } });
    await Hotel.deleteMany({ owner: ownerId });
    console.log("Cleared old seeded data.");

    // Insert Hotels
    const insertedHotels = await Hotel.insertMany(hotelsData);
    console.log("Hotels inserted successfully!");

    // Insert Rooms for each Hotel
    const roomsData = [];
    insertedHotels.forEach((hotel) => {
      // Double Bed Room
      roomsData.push({
        hotel: hotel._id,
        roomType: "Double Bed",
        pricePerNight: Math.floor(Math.random() * 300) + 200,
        amenities: ["Free WiFi", "Free Breakfast", "Pool Access"],
        images: [
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop",
        ],
        isAvailable: true,
      });

      // Single Bed Room
      roomsData.push({
        hotel: hotel._id,
        roomType: "Single Bed",
        pricePerNight: Math.floor(Math.random() * 200) + 100,
        amenities: ["Free WiFi", "Room Service"],
        images: [
          "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop",
        ],
        isAvailable: true,
      });

      // Luxury Room
      roomsData.push({
        hotel: hotel._id,
        roomType: "Luxury Room",
        pricePerNight: Math.floor(Math.random() * 500) + 500,
        amenities: ["Free WiFi", "Free Breakfast", "Room Service", "Mountain View", "Pool Access"],
        images: [
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop",
        ],
        isAvailable: true,
      });
    });

    await Room.insertMany(roomsData);
    console.log("Rooms inserted successfully!");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();
