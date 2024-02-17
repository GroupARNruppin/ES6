import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

const Profile = ({ user, logoutUser }) => {
  // Navigation
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); //lll
    }
  }, [user, navigate]);

  const navigateEditPage = () => {
    navigate('/edit-details');
  }

  if (!user) {
    return null;
  }
  console.log(user)

  return (
    <Box className="profile-container">
      <Typography variant="h2">Welcome {user.firstName} {user.lastName}</Typography>
      {/* Img  */}
      <div>
        <br />
        {user.imageFile && <img src={user.imageFile} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
        <br />
      </div>

      <Stack spacing={2} direction="column" className="user-details">
        <Typography variant="body1">Username: {user.userName}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        {/* .slice(0, 10) */}
        <Typography variant="body1">Birth Date: {user.birthDate}</Typography> 
        <Typography variant="body1">City: {user.city}</Typography>
        <Typography variant="body1">Street Name: {user.streetName}</Typography>
        <Typography variant="body1">House Number: {user.houseNumber}</Typography>

        {/* Add more Typography components for other user details */}
      </Stack>
      <Box className="button-container">
        <Button
          variant="contained"
          color="primary"
          className="edit-button"
          onClick={navigateEditPage}
        >
          Edit
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
          className="logout-button"
          onClick={logoutUser}
        >
          Logout
        </Button>
      </Box>
    </Box >
  );
};

export default Profile;