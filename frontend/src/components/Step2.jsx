import React from "react";
import { TextField, Grid, Typography } from "@mui/material";

const Step2 = ({ formik }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          PAN Verification
        </Typography>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          id="panNumber"
          name="panNumber"
          label="PAN Number"
          value={formik.values.panNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.panNumber && Boolean(formik.errors.panNumber)}
          helperText={formik.touched.panNumber && formik.errors.panNumber}
          inputProps={{ style: { textTransform: "uppercase" } }}
        />
      </Grid>
    </Grid>
  );
};

export default Step2;
