const User = require("../models/User");

// Admin check middleware
const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { isAdmin };
