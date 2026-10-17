
const express = require("express");
const Event = require("../models/Event");
const User = require("../models/User");
const Registration = require("../models/Registration");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
// POST create a new event
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, date, venue, capacity } = req.body;

    if (!title || !description || !date || !venue || capacity == null) {
      return res.status(400).json({
        message: "All event fields are required.",
      });
    }

    if (Number.isNaN(Date.parse(date)) || new Date(date) <= new Date()) {
      return res.status(400).json({
        message: "Event date must be a valid future date.",
      });
    }

    const event = await Event.create({
      title,
      description,
      date,
      venue,
      capacity,
    });

    res.status(201).json({
      message: "Event created successfully.",
      event,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create event.",
      error: error.message,
    });
  }
});


// GET all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events." });
  }
});

// GET a single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: "Invalid event ID." });
  }
});

// POST register for an event
router.post("/:id/register", async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({
        message: "Full name and email are required.",
      });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (new Date(event.date) <= new Date()) {
      return res.status(400).json({
        message: "Registration is closed for this event.",
      });
    }

    const registeredCount = await Registration.countDocuments({
      event: event._id,
    });

    if (registeredCount >= event.capacity) {
      return res.status(400).json({
        message: "This event is full.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      user = await User.create({
        fullName: fullName.trim(),
        email: normalizedEmail,
      });
    }

    const existingRegistration = await Registration.findOne({
      user: user._id,
      event: event._id,
    });

    if (existingRegistration) {
      return res.status(409).json({
        message: "You are already registered for this event.",
      });
    }

    const registration = await Registration.create({
      user: user._id,
      event: event._id,
    });

    res.status(201).json({
      message: "Registration successful.",
      registration,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to register for the event.",
    });
  }
});

module.exports = router;
