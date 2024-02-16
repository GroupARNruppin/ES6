import React from 'react';

const EditDetails = ({ user, editUser }) => {
    const [updatedUser, setUpdatedUser] = setState({ ...user })

    const handleEdit = ()=>{
        editUser(updatedUser)
    }

    return (
        <Stack spacing={2} direction="column">
            <h2>Update User</h2>
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
                Update user!
            </Button>
        </Stack>
    );
};

export default EditDetails;