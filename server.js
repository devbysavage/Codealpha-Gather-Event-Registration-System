require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(express.static("public"));

app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
console.log("MONGODB_URI exists:", Boolean(process.env.MONGODB_URI));
console.log("MONGODB_URI scheme:", process.env.MONGODB_URI?.split(":")[0]);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Event Registration System API is running!");
});
