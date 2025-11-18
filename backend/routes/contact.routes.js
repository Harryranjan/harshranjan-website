const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").notEmpty().withMessage("Message is required"),
  ],
  (req, res) => {
    res.json({ message: "Contact form submission - Coming soon" });
  }
);

module.exports = router;
