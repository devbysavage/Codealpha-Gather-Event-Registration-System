
const express = require("express");
const Registration = require("../models/Registration");
const protect = require("../middleware/authMiddleware");
const Event = require("../models/Event");

const router = express.Router();

// GET all registrations
router.get("/", protect, async (req, res) => {
  try {
    const ownedEvents = await Event.find({
  organizer: req.organizerId,
}).select("_id");

const eventIds = ownedEvents.map((event) => event._id);

const registrations = await Registration.find({
  event: { $in: eventIds },
})
  .populate("user", "fullName email")
  .populate("event", "title date venue");

    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch registrations.",
    });
  }
});

// DELETE a registration
router.delete("/:id", protect, async (req, res) => {
  try {
    const registration = await Registration.findById(
  req.params.id).populate("event", "organizer");

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found.",
      });
    }
    if (
  !registration.event ||
  registration.event.organizer?.toString() !== req.organizerId
) {
  return res.status(403).json({
    message: "You are not authorized to cancel this registration.",
  });
}

    await Registration.findByIdAndDelete(registration._id);
    
    res.status(200).json({
      message: "Registration cancelled successfully.",
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid registration ID.",
    });
  }
});

module.exports = router;
