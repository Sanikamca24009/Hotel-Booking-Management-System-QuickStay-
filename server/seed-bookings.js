import "dotenv/config";
import Hotel from "./models/Hotel.js";
import Room from "./models/Room.js";
import Booking from "./models/Booking.js";
import connectDB from "./configs/db.js";

// The logged-in user to seed bookings for
const userId = "user_3DtRTqc05yJR0NWiVxDojvLuM92"; // sanika3823@gmail.com

const cities = ["New York", "London", "Singapore", "Dubai"];

const seedBookings = async () => {
  try {
    await connectDB();

    // Remove old dummy bookings for this user
    await Booking.deleteMany({ user: userId });
    console.log("Cleared old dummy bookings for user.");

    const bookingsData = [];

    for (const city of cities) {
      // Find hotel in this city
      const hotel = await Hotel.findOne({ city });
      if (!hotel) {
        console.log(`No hotel found for city: ${city}`);
        continue;
      }

      // Find one room for this hotel
      const room = await Room.findOne({ hotel: hotel._id });
      if (!room) {
        console.log(`No room found for hotel: ${hotel.name}`);
        continue;
      }

      // Create a future booking (spread across different months)
      const cityIndex = cities.indexOf(city);
      const checkIn = new Date();
      checkIn.setDate(checkIn.getDate() + (cityIndex + 1) * 7); // 1, 2, 3, 4 weeks from now
      const checkOut = new Date(checkIn);
      checkOut.setDate(checkOut.getDate() + 2); // 2-night stay

      const nights = 2;
      const totalPrice = room.pricePerNight * nights;

      bookingsData.push({
        user: userId,
        room: room._id.toString(),
        hotel: hotel._id.toString(),
        checkInDate: checkIn,
        checkOutDate: checkOut,
        totalPrice,
        guests: 2,
        status: "confirmed",
        paymentMethod: "Pay At Hotel",
        isPaid: false,
      });

      console.log(`Booking created for ${hotel.name} (${city}) - $${totalPrice}`);
    }

    await Booking.insertMany(bookingsData);
    console.log(`\n✅ ${bookingsData.length} dummy bookings inserted for user sanika3823@gmail.com`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding bookings:", error);
    process.exit(1);
  }
};

seedBookings();
