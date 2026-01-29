const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const adminOnly = require("../middleware/admin");

const Claim = require("../models/Claim");
const Deal = require("../models/Deal");

const { claimDeal, getMyClaims } = require("../controllers/claim.controller");


// ========================
// USER: Claim a deal
// ========================
router.post("/:dealId", auth, claimDeal);


// ========================
// USER / ADMIN: Get claims
// ========================
router.get("/", auth, getMyClaims);


// ========================
// ADMIN: Approve a claim
// ========================

// ADMIN: Approve a claim
router.patch("/approve/:claimId", auth, adminOnly, async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.claimId).populate("deal");

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    // ✅ approve claim
    claim.status = "approved";
    await claim.save();

    // 🔒 KEEP deal LOCKED after approval
    await Deal.findByIdAndUpdate(claim.deal._id, {
      isLocked: true,
    });

    res.status(200).json({
      success: true,
      message: "Claim approved & deal locked",
      claim,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});



// ========================
// ADMIN: Reject a claim
// ========================

// ADMIN: Reject a claim
router.patch("/reject/:claimId", auth, adminOnly, async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(
      req.params.claimId,
      { status: "rejected" },
      { new: true }
    ).populate("deal");

    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    // 🔓 UNLOCK deal after rejection
    await Deal.findByIdAndUpdate(claim.deal._id, {
      isLocked: false,
    });

    res.status(200).json({
      success: true,
      message: "Claim rejected & deal unlocked",
      claim,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});


module.exports = router;
