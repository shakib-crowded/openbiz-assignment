import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import { submitRegistration } from "../services/api";

const steps = ["Aadhaar Verification", "PAN Verification", "Complete"];

const RegistrationForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      aadhaarNumber: "",
      otp: "",
      panNumber: "",
    },
    validationSchema: Yup.object({
      aadhaarNumber: Yup.string()
        .required("Aadhaar number is required")
        .matches(/^[0-9]{12}$/, "Must be 12 digits"),
      panNumber: Yup.string()
        .required("PAN is required")
        .matches(/^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/, "Invalid PAN format"),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await submitRegistration(values);
        handleNext();
      } catch (error) {
        console.error("Submission failed:", error);
        alert(`Already Registered Aadhaar or Pan`);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleAadhaarVerified = () => {
    setAadhaarVerified(true);
    handleNext();
  };

  const CompletionScreen = () => (
    <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom color="success.main">
        Registration Complete!
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Thank you for registering with Udyam.
      </Typography>
      <Typography variant="body2">
        Your PAN: <strong>{formik.values.panNumber}</strong>
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Your Aadhaar: <strong>{formik.values.aadhaarNumber}</strong>
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          formik.resetForm();
          setActiveStep(0);
          setAadhaarVerified(false);
        }}
      >
        Start New Registration
      </Button>
    </Paper>
  );

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length - 1 ? (
        <CompletionScreen />
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {activeStep === 0 && (
            <Step1 formik={formik} onAadhaarVerified={handleAadhaarVerified} />
          )}
          {activeStep === 1 && <Step2 formik={formik} />}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            {activeStep === steps.length - 2 ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!formik.isValid || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                variant="contained"
                color="primary"
                disabled={!formik.isValid || !aadhaarVerified}
              >
                Next
              </Button>
            )}
          </Box>
        </form>
      )}
    </Box>
  );
};

export default RegistrationForm;
