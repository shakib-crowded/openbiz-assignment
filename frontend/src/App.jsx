import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./pages/RegistrationForm";
import { Container } from "@mui/material";

function App() {
  return (
    <Router>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
