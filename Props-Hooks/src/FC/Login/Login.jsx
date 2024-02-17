import React, { useState } from 'react';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Login = ({ loginUser }) => {
    // State for credentials
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })
    // Navigation
    const navigate = useNavigate();
    
    const handleUserName = (event) => {
        setCredentials((prevLogin) => ({
            ...prevLogin,
            username: event.target.value
        }));
    }
    const handlePassword = (event) => {
        setCredentials((prevLogin) => ({
            ...prevLogin,
            password: event.target.value
        }));
    }

    const handleLogin = () => {
        if (loginUser(credentials) || (credentials.username == 'admin' && credentials.password == 'ad12343211ad')) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Welcome back!`,
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                if(credentials.username == 'admin' && credentials.password == 'ad12343211ad'){
                    console.info(credentials)
                    navigate('/system-admin');
                } else {
                    console.info(credentials)
                    navigate('/profile');
                }
            }, 1000);
        }
        else {
            Swal.fire({
                position: "center",
                icon: "warning",
                title: `Oops! Username/Password wrong!`,
            });
        }
    }


    return (
        <Stack spacing={2} direction="column">
            <h2>Login</h2>
            <TextField
                id="outlined-basic"
                label="UserName"
                variant="outlined"
                onChange={handleUserName}
                required
            />
            <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={handlePassword}
                required
            />

            <Button variant="contained" color="success" onClick={handleLogin}>
                Login!
            </Button>
        </Stack>
    );
};

export default Login