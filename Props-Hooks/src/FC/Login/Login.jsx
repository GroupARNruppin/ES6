import React, { useState } from 'react';
import Stack from "@mui/material/Stack";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

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

    const handleRegister = () => {
        navigate('/register')
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
                if (credentials.username == 'admin' && credentials.password == 'ad12343211ad') {
                    localStorage.setItem('admin', JSON.stringify(credentials))
                    navigate('/system-admin');
                } else {
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
            <Box className="button-container">
                <Button variant="contained" color="success" onClick={handleLogin}>
                    Login!
                </Button>
                <Button variant="contained" color="primary" className='register-button' onClick={handleRegister}>
                    Register
                </Button>
            </Box>
        </Stack>
    );
};

export default Login