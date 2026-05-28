const express = require("express");
const cors = require("cors");
require("dotenv").config();
 
const connectDB = require("./config/db");
 
const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const profileRoutes = require("./routes/profileRoutes");
 
const app = express();
 
connectDB();
 
// FIX: Restrict CORS to only the client origin
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://healthcare-tracker-1.onrender.com"
    ],
    credentials: true,
  })
); 
app.use(express.json());
 
app.get("/", (req, res) => {
  res.send("Healthcare Tracker API Running");
});
 
app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/profile", profileRoutes);
 
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
 
const PORT = process.env.PORT || 5000;
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});