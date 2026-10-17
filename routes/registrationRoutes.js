
const express = require("express");
const Registration = require("../models/Registration");

const router = express.Router();

// GET all registrations
router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find()
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
router.delete("/:id", async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(
      req.params.id
    );

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found.",
      });
    }

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
