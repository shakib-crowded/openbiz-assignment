import React, { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { verifyAadhaar, verifyOtp } from "../services/api";

const Step1 = ({ formik, onAadhaarVerified }) => {
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState(null);
  const [countdown, setCountdown] = useState(0);

  // Handle OTP countdown timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOtp = async () => {
    try {
      setIsSendingOtp(true);
      setOtpError(null);

      // Call API to send OTP
      const otp = await verifyAadhaar(formik.values.aadhaarNumber);
      alert(`Your OTP is ${otp.otp}`);

      setOtpSent(true);
      setCountdown(60); // 60 seconds countdown
    } catch (error) {
      setOtpError(error.message || "Failed to send OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsVerifying(true);
      setVerificationError(null);

      // Call API to verify OTP
      await verifyOtp(formik.values.aadhaarNumber, formik.values.otp);

      // Notify parent component that Aadhaar is verified
      onAadhaarVerified();
    } catch (error) {
      console.log("There is an Error: ", error);

      setVerificationError("Invalid OTP or Expired OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    await handleSendOtp();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Aadhaar Verification
        </Typography>
      </Grid>

      <Grid item xs={12} md={8}>
        <TextField
          fullWidth
          id="aadhaarNumber"
          name="aadhaarNumber"
          label="Aadhaar Number"
          value={formik.values.aadhaarNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.aadhaarNumber && Boolean(formik.errors.aadhaarNumber)
          }
          helperText={
            formik.touched.aadhaarNumber && formik.errors.aadhaarNumber
          }
          disabled={otpSent}
          inputProps={{ maxLength: 12 }}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <Box display="flex" alignItems="flex-end" height="100%">
          <Button
            variant="contained"
            color="primary"
            disabled={
              !formik.values.aadhaarNumber ||
              formik.errors.aadhaarNumber ||
              isSendingOtp ||
              otpSent
            }
            onClick={handleSendOtp}
            fullWidth
          >
            {isSendingOtp ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send OTP"
            )}
          </Button>
        </Box>
      </Grid>

      {otpSent && (
        <>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              id="otp"
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={formik.touched.otp && formik.errors.otp}
              inputProps={{ maxLength: 6 }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box display="flex" alignItems="flex-end" height="100%">
              <Button
                variant="contained"
                color="secondary"
                disabled={isVerifying || countdown > 0}
                onClick={handleResendOtp}
                fullWidth
              >
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              disabled={!formik.values.otp || formik.errors.otp || isVerifying}
              onClick={handleVerifyOtp}
              fullWidth
              size="large"
            >
              {isVerifying ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Verify Aadhaar"
              )}
            </Button>
          </Grid>
        </>
      )}

      {/* Error notifications */}
      <Snackbar
        open={!!otpError}
        autoHideDuration={6000}
        onClose={() => setOtpError(null)}
      >
        <Alert severity="error" onClose={() => setOtpError(null)}>
          {otpError}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!verificationError}
        autoHideDuration={6000}
        onClose={() => setVerificationError(null)}
      >
        <Alert severity="error" onClose={() => setVerificationError(null)}>
          {verificationError}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Step1;
