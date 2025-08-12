// server/routes/registration.js
const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registration");

// Submit registration form
router.post("/submit", registrationController.submitRegistration);

// Verify Aadhaar and send OTP
router.post("/verify-aadhaar", registrationController.verifyAadhaar);

// Verify OTP for Aadhaar
router.post("/verify-otp", registrationController.verifyOtp);

// Verify PAN
router.post("/verify-pan", registrationController.verifyPan);

module.exports = router;
