const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");

router.post("/register", register);
router.post("/login", login);

// 🔥 THIS MUST EXIST
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
});

module.exports = router;
