const Claim = require("../models/Claim");
const Deal = require("../models/Deal");
const User = require("../models/User");

// Claim a deal
exports.claimDeal = async (req, res) => {
  try {
    const userId = req.user.id;
    const dealId = req.params.dealId;

    const user = await User.findById(userId);
    const deal = await Deal.findById(dealId);

    if (!deal) return res.status(404).json({ success: false, message: "Deal not found" });

    // Locked deal check
    if (deal.isLocked && !user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "This deal requires user verification",
      });
    }

    // Prevent duplicate claim
    const alreadyClaimed = await Claim.findOne({ user: userId, deal: dealId });
    if (alreadyClaimed)
      return res.status(400).json({ success: false, message: "Deal already claimed" });

    const claim = await Claim.create({ user: userId, deal: dealId, status: "pending" });

    res.status(201).json({ success: true, message: "Deal claimed successfully", claim });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



// USER + ADMIN: Get claims
exports.getMyClaims = async (req, res) => {
  try {
    let claims;

    if (req.user.role === "admin") {
      // ADMIN → all claims
      claims = await Claim.find()
        .populate("deal", "title isLocked")
        .populate("user", "name email")
        .sort({ createdAt: -1 });
    } else {
      // USER → own claims only
      claims = await Claim.find({ user: req.user._id })
        .populate("deal", "title isLocked")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({ success: true, claims });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

