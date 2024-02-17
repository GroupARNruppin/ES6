import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ user, logoutUser }) => {
  // Navigation
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const navigateEditPage = () => {
    navigate('/edit-details');
  }

  if (!user) {
    return null;
  }


  return (
    <Box className="profile-container">
      <Typography variant="h2">Welcome {user.firstName} {user.lastName}</Typography>

      <Stack spacing={2} direction="column" className="user-details">
        <Typography variant="body1">Username: {user.userName}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Birth Date: {user.birthDate.slice(0, 10)}</Typography>
        <Typography variant="body1">City: {user.city}</Typography>
        <Typography variant="body1">Street Name: {user.streetName}</Typography>
        <Typography variant="body1">House Number: {user.houseNumber}</Typography>

        {/* Add more Typography components for other user details */}
      </Stack>
      <Box className="button-container">
        <Button
          variant="contained"
          color="primary"
          className="logout-button"
          onClick={logoutUser}
        >
          Logout
        </Button>
        <a href="https://izra.co.il/home" target="_blank" >
          <Button
            variant="contained"
            color="primary"
            className="game-button"
          >
            Game
          </Button>
        </a>
        <Button
          variant="contained"
          color="primary"
          className="edit-button"
          onClick={navigateEditPage}
        >
          Edit
        </Button>
      </Box>
    </Box >
  );
};

export default Profile;