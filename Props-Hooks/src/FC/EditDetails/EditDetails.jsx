import React, { useState, useEffect } from 'react';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Swal from 'sweetalert2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const EditDetails = ({ user, editUser }) => {
    // State for all user details
    const [updatedUser, setUpdatedUser] = useState({ ...user });
    const [imagePreview, setImagePreview] = useState(null);

    // Navigation
    const navigate = useNavigate();

    // Functions to handle changes in each detail
    const handleInputChange = (field, value) => {
        setUpdatedUser(prevUser => ({
            ...prevUser,
            [field]: value
        }));
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        const storedImagePreview = updatedUser.imageFile;
        if (storedImagePreview) {
          setImagePreview(storedImagePreview);
        }
    
    }, [user, navigate]);

    // Function to handle updating user details
    const handleUpdateUser = () => {
        editUser(updatedUser);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "User details updated!",
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            navigate('/profile');
        }, 1000);
    };

    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff == 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    // Save image
    const handleSave = () => {
        localStorage.setItem('imageData', imagePreview);
        console.log('Image saved!');
    };
    // Adding image
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (file.type == 'image/png' || file.type == 'image/jpeg') {
                const reader = new FileReader();

                reader.onloadend = () => {
                    setUpdatedUser((prevUser) => ({
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

    // Navigate back to profile
    const handleBackToProfile = ()=>{
        navigate('/profile');
    }

    if (!user) {
        return null;
    }
    return (
        <Stack spacing={2} direction="column">
            <h2>Update User</h2>

            {/* Input fields for user details */}
            <TextField
                id="outlined-basic"
                label="User name"
                variant="outlined"
                value={updatedUser.userName}
                onChange={(e) => handleInputChange('userName', e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={updatedUser.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <TextField
                id="outlined-basic"
                label="Lirst name"
                variant="outlined"
                value={updatedUser.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
            />

            <TextField
                id="outlined-basic"
                label="Last name"
                variant="outlined"
                value={updatedUser.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
            />
            {/* Date picker for the user's date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label="Select Date"
                    // value={updatedUser.birthDate ? new Date(updatedUser.birthDate) : null}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                    shouldDisableDate={(date) => {
                        const userAge = calculateAge(date);
                        return userAge < 18 || userAge > 120;
                    }}
                />
            </LocalizationProvider>

            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={updatedUser.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
            />

            {/* Select fiend for city */}
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth error={updatedUser.city == ""} required>
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={updatedUser.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                    >
                        <MenuItem value={"Tel Aviv"}>Tel Aviv</MenuItem>
                        <MenuItem value={"Haifa"}>Haifa</MenuItem>
                        <MenuItem value={"Jerusalem"}>Jerusalem</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Street and house number */}
            {[
                { label: "Street", stateKey: "streetName", pattern: "[A-Za-zא-ת]+" },
                { label: "House number", stateKey: "houseNumber", pattern: "^\\d+$" },
                // Add more fields as needed
            ].map((field) => (
                <TextField
                    key={field.label}
                    id="outlined-basic"
                    label={updatedUser[field.label]}
                    value={updatedUser[field.stateKey]}
                    variant="outlined"
                    onChange={(e) => handleInputChange(field.stateKey, e.target.value)}
                    error={!new RegExp(field.pattern).test(updatedUser[field.stateKey] || '')}
                    helperText={
                        !new RegExp(field.pattern).test(updatedUser[field.stateKey] || '')
                            ? `Invalid ${field.label}!`
                            : ''
                    }
                />
            ))}

            {/* Img  */}
            <div>
                <input type="file" onChange={handleFileChange} />
                <br />
                {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                <br />
                {/* No need this button */}
                <Button variant="contained" onClick={handleSave} disabled={!updatedUser.imageFile}>
                    Save Image
                </Button>
            </div>

            <Box className="button-container">
            {/* Button to update user details */}
            <Button variant="contained" color="success" onClick={handleUpdateUser}>
                Update User
            </Button>
            <Button variant="contained" color="primary" onClick={handleBackToProfile}>
                Back
            </Button>
            </Box>
        </Stack>
    );
};

export default EditDetails;
