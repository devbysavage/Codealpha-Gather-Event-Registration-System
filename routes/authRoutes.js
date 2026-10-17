
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Organizer = require("../models/Organizer");

const router = express.Router();

// Organizer registration
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, email, and password are required.",
      });
    }

    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingOrganizer = await Organizer.findOne({
      email: normalizedEmail,
    });

    if (existingOrganizer) {
      return res.status(409).json({
        message: "An organizer with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const organizer = await Organizer.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Organizer account created successfully.",
      organizer: {
        id: organizer._id,
        fullName: organizer.fullName,
        email: organizer.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An organizer with this email already exists.",
      });
    }

    return res.status(500).json({
      message: "Failed to create organizer account.",
    });
  }
});

// Organizer login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const organizer = await Organizer.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!organizer) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      organizer.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "Authentication is not configured.",
      });
    }

    const token = jwt.sign(
      { organizerId: organizer._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      organizer: {
        id: organizer._id,
        fullName: organizer.fullName,
        email: organizer.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed.",
    });
  }
});

module.exports = router;
