import User from "../models/User.js";

// Middleware to check if user is authenticated
export const protect = async (req, res, next) => {
  try {
    const userId = req.auth ? req.auth.userId : null;
    if (!userId) {
      return res.json({ success: false, message: "not authenticated" });
    }

    let user = await User.findById(userId);

    // Sync user from Clerk if not present in local DB (happens on localhost without webhooks)
    if (!user) {
      try {
        const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
          headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
        });
        if (response.ok) {
          const clerkUser = await response.json();
          try {
            user = await User.create({
              _id: clerkUser.id,
              email: clerkUser.email_addresses[0].email_address,
              username: clerkUser.first_name + " " + clerkUser.last_name,
              image: clerkUser.image_url,
            });
          } catch (createError) {
            // Duplicate key: user was created by another request in parallel — just fetch it
            user = await User.findById(userId);
          }
        }
      } catch (syncError) {
        console.error("Clerk sync error:", syncError.message);
      }
    }

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};