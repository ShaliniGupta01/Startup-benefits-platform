const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");
const User = require("../models/User");

// 🔒 ADMIN – GET ALL USERS
router.get("/users", auth, isAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.json({ success: true, users });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
