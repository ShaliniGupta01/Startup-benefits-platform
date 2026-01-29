const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const dealRoutes = require("./routes/deal.routes");
const claimRoutes = require("./routes/claim.routes");
const adminRoutes = require("./routes/admin.routes");
const errorHandler = require("./middleware/error.middleware");
const { connectDB } = require("./config/db");
const { PORT } = require("./config/env");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/admin", adminRoutes);

// Error handler
app.use(errorHandler);

// Health check route
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("DB connection failed:", err);
});
