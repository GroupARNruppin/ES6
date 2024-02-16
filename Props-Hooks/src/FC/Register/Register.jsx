import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';


const Register = ({ registerUser }) => {
  // State for image preview
  const [imagePreview, setImagePreview] = useState(null);

  // State for user information and form errors
  const [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    name: "",
    imageFile: null,
    firstName: "",
    lastName: "",
    email: "",
    birthDate: new Date(),
    city: "",
    streetName: "",
    houseNumber: 0
  });
  // State to track form errors
  const [formErrors, setFormErrors] = useState({
    userName: false,
    password: false,
    confirmPassword: false,
    firstName: false,
    lastName: false,
    email: false,
    city: false,
    streetName: false,
    houseNumber: false,
    date: false
  });
  // Array defining form fields with validation patterns and error messages
  const fields = [
    { key: "userName", pattern: "[A-Za-z0-9@#$%^&*()_+={}\\|:;\"'<>?,./\\[\\]-]+", message: "Invalid user name" },
    { key: "password", pattern: "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{7,12}", message: "Invalid password" },
    { key: "confirmPassword" },
    { key: "firstName", pattern: "[A-Za-zא-ת]+", message: "Invalid first name" },
    { key: "lastName", pattern: "[A-Za-zא-ת]+", message: "Invalid last name" },
    { key: "email", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message: "Invalid email" },
    { key: "city" },
    { key: "streetName" },
    { key: "houseNumber", pattern: "^\\d+$", message: "Invalid house number" },
    { key: "date" }
  ];
  // Function to validate the form based on the defined patterns
  const validateForm = () => {
    const errors = {};

    fields.forEach((field) => {
      const value = user[field.key];

      if (field.pattern) {
        errors[field.key] = value === "" || !new RegExp(field.pattern).test(value);
      } else {
        errors[field.key] = value === "";
      }
    });

    errors.confirmPassword = user.confirmPassword !== user.password;
    errors.date = user.birthDate === "";

    setFormErrors(errors);

    // Returns true if no errors are found, indicating the form is valid
    return Object.values(errors).every((error) => !error);
  };

  // Function to handle user registration
  const handleRegistration = () => {
    if (validateForm()) {
      // Call the provided registerUser function with user data
      registerUser(user);
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: `Please fill in all required fields correctly!`,
      });
    }
  };

  // Function to handle input changes in the form
  const handleInputChange = (event, property) => {
    setUser((prevUser) => ({
      ...prevUser,
      [property]: event.target.value
    }));
  };

  // Function to handle changes in the date picker
  const handleDateChange = (date) => {
    setUser((prevUser) => ({
      ...prevUser,
      birthDate: date,
    }));
  };

  // Function to handle changes in the file input for image upload
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        const reader = new FileReader();

        reader.onloadend = () => {
          setUser((prevUser) => ({
            ...prevUser,
            imageFile: file,
          }));
          setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert('Please select a PNG or JPG image.');
      }
    }
  };

  // Function to handle saving image data (for demonstration purposes)
  const handleSave = () => {
    localStorage.setItem('imageData', imagePreview);
    console.log('Image saved!');
  };
  // Function to calculate age based on birthdate
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  // Function to calculate age based on birthdate
  const isValidEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  return (
    <Stack spacing={2} direction="column">
      <h2>Register User:</h2>
      {/* Render TextFields */}
      {[
        { label: "UserName", stateKey: "userName", pattern: "[A-Za-z0-9@#$%^&*()_+={}\\|:;\"'<>?,./\\[\\]-]+", maxLength: 60 },
        { label: "Password", stateKey: "password", pattern: "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{7,12}", minLength: 7, maxLength: 12 },
        { label: "Confirm password", stateKey: "confirmPassword", error: user.confirmPassword !== user.password, helperText: user.confirmPassword !== user.password ? 'Passwords do not match!' : '' },
        { label: "FirstName", stateKey: "firstName", pattern: "[A-Za-zא-ת]+", maxLength: 50 },
        { label: "LastName", stateKey: "lastName", pattern: "[A-Za-zא-ת]+", maxLength: 50 },
      ].map((field) => (
        <TextField
          key={field.label}
          id={`outlined-${field.label.toLowerCase().replace(" ", "-")}`}
          label={field.label}
          variant="outlined"
          onChange={(event) => handleInputChange(event, field.stateKey)}
          required
          // Adding error and helperText based on validation patterns and formErrors state
          error={field.error || (field.pattern && !new RegExp(field.pattern).test(user[field.stateKey]))}
          helperText={
            user[field.stateKey] === ""
              ? `${field.label} is required!`
              : field.error
                ? field.helperText
                : field.pattern && !new RegExp(field.pattern).test(user[field.stateKey])
                  ? `${field.label} is not valid!`
                  : ''

          }
          // Adding inputProps for setting maxLength and minLength
          inputProps={{
            maxLength: field.maxLength,
            minLength: field.minLength,
          }}
        />
      ))}

      {/* Date picker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select Date"
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
          required
          error={user.date === ""}
          helperText={user.date === "" ? 'Date is required!' : ''}
          shouldDisableDate={(date) => {
            const userAge = calculateAge(date);
            return userAge < 18 || userAge > 120;
          }}
        />
      </LocalizationProvider>

      {/* Email input */}
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        onChange={(event) => handleInputChange(event, "email")}
        required
        error={!isValidEmail(user.email)}
        helperText={!isValidEmail(user.email) ? 'Email is required!' : ''}
        inputProps={{
          maxLength: 50,
        }}
      />

      {/* Select fiend for city */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth error={user.city === ""} required>
          <InputLabel id="demo-simple-select-label">City</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user.city}
            onChange={(event) => handleInputChange(event, "city")}
          >
            <MenuItem value={"Tel Aviv"}>Tel Aviv</MenuItem>
            <MenuItem value={"Haifa"}>Haifa</MenuItem>
            <MenuItem value={"Jerusalem"}>Jerusalem</MenuItem>
          </Select>
          {user.city === "" ? "City is required!" : ""}
        </FormControl>
      </Box>

      {/* Street and house number */}
      {[
        { label: "Street", stateKey: "streetName", pattern: "[A-Za-zא-ת]+" },
        { label: "House number", stateKey: "houseNumber", pattern: "^\\d+$" },
      ].map((field) => (
        <TextField
          key={field.label}
          id={`outlined-${field.label.toLowerCase().replace(" ", "-")}`}
          label={field.label}
          variant="outlined"
          onChange={(event) => handleInputChange(event, field.stateKey)}
          required
          // Adding error and helperText based on validation patterns and formErrors state
          error={!new RegExp(field.pattern).test(user[field.stateKey])}
          helperText={
            user[field.stateKey] === ""
              ? `${field.label} is required!`
              : !new RegExp(field.pattern).test(user[field.stateKey])
                ? `Invalid ${field.label}!`
                : ''
          }
        />
      ))}

      {/* Imge upload  */}
      <div>
        <input type="file" onChange={handleFileChange} />
        <br />
        {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
        <br />
        {/* No need this button */}
        <Button variant="contained" onClick={handleSave} disabled={!user.imageFile}>
          Save Image
        </Button>
      </div>

      <br />

      {/* Button for user registration that send the data to App.jsx */}
      <Button
        variant="contained"
        endIcon={<PersonAdd />}
        onClick={handleRegistration}
      >
        Add User
      </Button>

    </Stack>
  );
};

export default Register;
