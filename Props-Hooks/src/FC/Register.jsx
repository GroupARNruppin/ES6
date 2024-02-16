// import * as React from 'react';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import PersonAdd from "@mui/icons-material/PersonAdd";
// import { AdapterDateFns, DatePicker } from '@mui/lab';
// import { AdapterDateFns } from '@mui/lab/AdapterDateFns';
// import { DatePicker } from '@mui/lab/DatePicker';




const Register = ({registerUser}) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [user, setUser] = useState({
        userName: "",
        password: "",
        name: "",
        imageFile: null,
        firstName: "",
        lastName: "",
        email: "",
        birthDate: new Date(),
        city: "",
        streetName: "",
        houseNumber: 0
        // userName: PropTypes.string,
        // password: PropTypes.string,
        // name: "",
        // imageFile: null,
        // firstName: "",
        // lastName: PropTypes.string,
        // email: PropTypes.string,
        // birthDate: new Date(),
        // city: PropTypes.string,
        // streetName: PropTypes.string,
        // houseNumber: PropTypes.string
      });
    const handleRegistration = ()=>{
        registerUser(user)
    }
    
  return (
    <Stack spacing={2} direction="column">
        <h3>Inputs:</h3>
        <TextField
          id="outlined-basic"
          label="UserName"
          variant="outlined"
        //   onChange={handleUserName}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
        //   onChange={handlePassword}
        />
        <TextField
          id="outlined-basic"
          label="FirstName"
          variant="outlined"
        //   onChange={handleFirstName}
        />
        <TextField
          id="outlined-basic"
          label="LastName"
          variant="outlined"
        //   onChange={handleLastName}
        />
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
        </LocalizationProvider> */}
        <br />
        
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

