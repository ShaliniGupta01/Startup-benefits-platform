const Deal = require("../models/Deal");

// GET all deals
exports.getAllDeals = async (req, res) => {
  const deals = await Deal.find();
  res.json(deals);
};

// GET single deal
exports.getDeal = async (req, res) => {
  const deal = await Deal.findById(req.params.id);
  res.json(deal);
};

// CREATE deal (NEW)
exports.createDeal = async (req, res) => {
  const { title, description, partner, category, isLocked } = req.body;

  const deal = await Deal.create({
    title,
    description,
    partner,
    category,
    isLocked
  });

  res.status(201).json(deal);
};
