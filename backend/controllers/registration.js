const Registration = require("../models/Registration");

const otpStore = new Map();

// Generate random 6-digit OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.verifyAadhaar = async (req, res) => {
  try {
    const { aadhaarNumber } = req.body;

    // Validate Aadhaar format
    if (!/^[0-9]{12}$/.test(aadhaarNumber)) {
      return res.status(400).json({ error: "Invalid Aadhaar number format" });
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    // Store OTP temporarily
    otpStore.set(aadhaarNumber, { otp, expiresAt });

    res.json({
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { aadhaarNumber, otp } = req.body;

    // Check if OTP exists and is not expired
    const storedOtp = otpStore.get(aadhaarNumber);

    if (!storedOtp || storedOtp.expiresAt < new Date()) {
      return res.status(400).json({ error: "OTP expired or invalid" });
    }

    if (storedOtp.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Clear OTP after successful verification
    otpStore.delete(aadhaarNumber);

    res.json({
      message: "Aadhaar verified successfully",
      verified: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitRegistration = async (req, res) => {
  try {
    const registrationData = req.body;

    // Validate required fields
    if (!registrationData.aadhaarNumber || !registrationData.panNumber) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create new registration
    const registration = new Registration(registrationData);

    await registration.save();

    res.status(201).json({
      message: "Registration submitted successfully",
      data: registration,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyPan = async (req, res) => {
  try {
    const { panNumber } = req.body;

    // Validate PAN format
    if (!/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/.test(panNumber)) {
      return res.status(400).json({ error: "Invalid PAN format" });
    }

    res.json({ message: "PAN verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
