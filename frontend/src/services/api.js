import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const verifyAadhaar = async (aadhaarNumber) => {
  const response = await axios.post(`${API_BASE_URL}/verify-aadhaar`, {
    aadhaarNumber,
  });
  return response.data;
};

export const verifyOtp = async (aadhaarNumber, otp) => {
  const response = await axios.post(`${API_BASE_URL}/verify-otp`, {
    aadhaarNumber,
    otp,
  });
  return response.data;
};

export const verifyPan = async (panNumber) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/registration/verify-pan`,
      {
        panNumber,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const submitRegistration = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submit`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
