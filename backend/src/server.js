const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const dealRoutes = require("./routes/deal.routes");
const claimRoutes = require("./routes/claim.routes");
const adminRoutes = require("./routes/admin.routes");

const errorHandler = require("./middleware/error.middleware");
const { connectDB } = require("./config/db");
const { PORT, FRONTEND_URL } = require("./config/env");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

// CORS configuration
const allowedOrigins = [
  "https://startup-benefits-platform-eta.vercel.app",             
  "http://localhost:3000"    // Local frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

/* -------------------- ROUTES -------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/claims", claimRoutes);
app.use("/api/admin", adminRoutes);

/* -------------------- HEALTH CHECK -------------------- */

app.get("/", (req, res) => {
  res.status(200).send("Backend is working ✅");
});

/* -------------------- ERROR HANDLER -------------------- */

app.use(errorHandler);

/* -------------------- START SERVER -------------------- */

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
  });
