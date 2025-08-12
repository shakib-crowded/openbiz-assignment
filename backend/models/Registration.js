const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  // Aadhaar Information
  aadhaarNumber: {
    type: String,
    required: [true, "Aadhaar number is required"],
    unique: true,
    match: [/^[0-9]{12}$/, "Please provide a valid 12-digit Aadhaar number"],
    index: true,
  },
  aadhaarVerified: {
    type: Boolean,
    default: false,
  },
  aadhaarVerificationDate: Date,

  // PAN Information
  panNumber: {
    type: String,
    required: [true, "PAN number is required"],
    unique: true,
    uppercase: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Please provide a valid PAN"],
    index: true,
  },
  panVerified: {
    type: Boolean,
    default: false,
  },
  panVerificationDate: Date,

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
registrationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Registration", registrationSchema);
