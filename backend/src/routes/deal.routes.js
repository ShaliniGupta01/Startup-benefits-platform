const router = require("express").Router();
const {
  getAllDeals,
  getDeal,
  createDeal
} = require("../controllers/deal.controller");

const auth = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin");

// 🔓 PUBLIC ROUTES
router.get("/", getAllDeals);
router.get("/:id", getDeal);

// 🔒 ADMIN ONLY - CREATE DEAL
router.post("/", auth, adminOnly, createDeal);

module.exports = router;
