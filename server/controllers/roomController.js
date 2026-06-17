import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { v2 as cloudinary } from "cloudinary";

// API to create a new room for a hotel
// POST /api/rooms
export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    const hotel = await Hotel.findOne({ owner: req.auth.userId });

    if (!hotel) return res.json({ success: false, message: "No Hotel found" });

    // upload images to cloudinary
    const uploadImages = req.files.map(async (file) => {
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    // Wait for all uploads to complete
    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      images,
    });

    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all rooms
// GET /api/rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: 'hotel',
        populate: {
          path: 'owner',
          select: 'image',
        },
      }).sort({ createdAt: -1 });

    // Filter out rooms where hotel was deleted (populate returns null for orphaned refs)
    const validRooms = rooms.filter(room => room.hotel !== null && room.hotel !== undefined);

    res.json({ success: true, rooms: validRooms });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all rooms for a specific hotel
// GET /api/rooms/owner
export const getOwnerRooms = async (req, res) => {
  try {
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotelData) return res.json({ success: true, rooms: [] });
    const rooms = await Room.find({ hotel: hotelData._id.toString() }).populate("hotel");
    res.json({ success: true, rooms });
  } catch (error) {
    console.log(error);
    
    res.json({ success: false, message: error.message });
  }
};

// API to toggle availability of a room
// POST /api/rooms/toggle-availability
export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);
    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();
    res.json({ success: true, message: "Room availability Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to delete a room
// DELETE /api/rooms/:id
export const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const hotelData = await Hotel.findOne({ owner: req.auth.userId });
    if (!hotelData) {
      return res.json({ success: false, message: "No Hotel found" });
    }
    const room = await Room.findOneAndDelete({ _id: roomId, hotel: hotelData._id.toString() });
    if (!room) {
      return res.json({ success: false, message: "Room not found or unauthorized" });
    }
    res.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};