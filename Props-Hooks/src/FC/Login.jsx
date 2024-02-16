import React, { useState } from 'react';

const Login = ({ loginUser }) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })

    handleLogin = () =>{
        loginUser(credentials)
    }

    return (
        <div>
            {/* Your JSX code here */}asd
        </div>
    );
};

export default Login