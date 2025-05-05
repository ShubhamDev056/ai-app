import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Container,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  CircularProgress,
  // Box,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TopHeader from "./components/ui/TopHeader";
import Header from "./components/ui/Header";

// Define the schema with Yup for validation
const schema = yup.object().shape({
  state: yup.string().required("State is required"),
  query: yup.string().required("Query is required"),
});

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const aiResponses = [
  "The water scheme in this state is well-planned and is continuously improving. We'll ensure the best possible outcome for you.",
  "Based on your query, we are enhancing the infrastructure in your area. Stay tuned for more updates!",
  "Water supply issues are being addressed at a regional level, with more resources allocated to your area for development.",
  "Your query is under review. Rest assured, we are committed to providing clean and efficient water access.",
  "The state has taken various measures to ensure the water supply is enhanced. Further details will be shared soon.",
  "We are currently monitoring water availability and infrastructure in your region. Updates will be communicated regularly.",
];

function App() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  // Initialize React Hook Form with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Mock AI response generator
  const generateAiResponse = () => {
    const randomResponse =
      aiResponses[Math.floor(Math.random() * aiResponses.length)];
    return randomResponse;
  };

  // Form submission handler
  const onSubmit = (data) => {
    setIsLoading(true); // Show loading spinner
    setTimeout(() => {
      const generatedAiResponse = generateAiResponse(); // Generate random AI response
      setResponse(data); // Show user query and selected state
      setAiResponse(generatedAiResponse); // Set AI response
      setIsLoading(false); // Hide loading spinner
    }, 1500); // Simulate an async operation (e.g., server request)
  };

  return (
    <div className="App">
      {/* Header */}
      <TopHeader />
      <Header />

      {/* Main Content */}
      <Container sx={{ marginTop: "40px" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" textAlign="center" mb={2}>
                  Water Scheme Query (Select a state and ask your questions!)
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Select State */}
                  <FormControl
                    fullWidth
                    error={!!errors.state}
                    sx={{ marginBottom: "16px" }}
                  >
                    <InputLabel>Select State</InputLabel>
                    <Select
                      label="Select State"
                      {...register("state")}
                      defaultValue=""
                    >
                      {states.map((state, index) => (
                        <MenuItem key={index} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography variant="body2" color="error">
                      {errors.state?.message}
                    </Typography>
                  </FormControl>

                  {/* Query Input */}
                  <TextField
                    label="Enter Your Query"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    {...register("query")}
                    error={!!errors.query}
                    helperText={errors.query?.message}
                    sx={{ marginBottom: "16px" }}
                  />

                  {/* Submit Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ padding: "12px" }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Submit Query"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Response Display */}
      {response && (
        <Container sx={{ marginTop: "40px" }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
              <Alert severity="success" sx={{ boxShadow: 3 }}>
                <Typography variant="h6">
                  Query Submitted Successfully!
                </Typography>
                <Typography>
                  <strong>State:</strong> {response.state}
                </Typography>
                <Typography>
                  <strong>Your Query:</strong> {response.query}
                </Typography>
                <Typography variant="h6" mt={2}>
                  <strong>AI Response:</strong>
                </Typography>
                <Typography>{aiResponse}</Typography>
              </Alert>
            </Grid>
          </Grid>
        </Container>
      )}

      {/* Footer */}
      {/* <Box sx={{ bgcolor: "background.default", padding: "16px" }}>
        <Typography variant="body2" color="textSecondary" textAlign="center">
          &copy; 2025 Jal Jeevan Mission. All rights reserved.
        </Typography>
      </Box> */}
    </div>
  );
}

export default App;
