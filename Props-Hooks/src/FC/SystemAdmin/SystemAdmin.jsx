import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import EditDetails from '../EditDetails/EditDetails'; // Assuming 'EditDetails' component is in a separate file
import { useNavigate } from 'react-router-dom';
import Button from "@mui/material/Button";

const SystemAdmin = ({ users, deleteUser, editUser }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [updatedUser, setUpdatedUser] = useState(null)

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"))
    if(!adminData) {
      navigate('/');
      return
    }
    if (adminData.userName == 'admin' && adminData.password == 'ad12343211ad') {
      // Navigate to the login if the user is not an admin
      navigate('/');
      return
    }
  }, [navigate]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (email) => {
    deleteUser(email);
  };

  const handleEdit = (user) => {
    Swal.fire({
      title: 'Edit User',
      html: `
      <img src=${user.imageFile} alt="Preview" style={{ width: '50px', height: '50px' }} />
        <input id="userName" onChange="${handleInputChange('userName', event.target.value)}" class="swal2-input" placeholder="Username" value="${user.userName}">
        <input id="password" onChange="${handleInputChange('password', event.target.value)}" type="password" class="swal2-input" placeholder="Password" value="${user.password}">
        <input id="firstName" onChange="${handleInputChange('firstName', event.target.value)}" class="swal2-input" placeholder="First Name" value="${user.firstName}">
        <input id="lastName" onChange="${handleInputChange('lastName', event.target.value)}" class="swal2-input" placeholder="Last Name" value="${user.lastName}">
        <input id="email" onChange="${handleInputChange('email', event.target.value)}" class="swal2-input" placeholder="Email" value="${user.email}">
        <input id="city" onChange="${handleInputChange('city', event.target.value)}" class="swal2-input" placeholder="City" value="${user.city}">
        <input id="streetName" onChange="${handleInputChange('streetName', event.target.value)}" class="swal2-input" placeholder="Street Name" value="${user.streetName}">
        <input id="houseNumber" onChange="${handleInputChange('houseNumber', event.target.value)}" class="swal2-input" placeholder="House Number" value="${user.houseNumber}">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          userName: document.getElementById('userName').value,
          password: document.getElementById('password').value,
          firstName: document.getElementById('firstName').value,
          lastName: document.getElementById('lastName').value,
          email: document.getElementById('email').value,
          city: document.getElementById('city').value,
          streetName: document.getElementById('streetName').value,
          houseNumber: document.getElementById('houseNumber').value,
          confirmPassword: document.getElementById('password').value,
          imageFile: user.imageFile,
          birthDate: user.birthDate
        };
      }
    }).then((result) => {
      editUser(result.value);
    });

    // Initialize date picker for birthDate input
    const picker = new Pikaday({
      field: document.getElementById('birthDate'),
      format: 'YYYY-MM-DD',
      onSelect: function(date) {
        document.getElementById('birthDate').value = this.getMoment().format('YYYY-MM-DD');
      }
    });
};



  const handleInputChange = (field, value) => {
    setUpdatedUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  const handleLogOutAdmin = ()=>{
    localStorage.removeItem("admin");
    navigate('/')
  }
  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <Toolbar>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Users
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'medium'}
          aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Birth Date</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Street Name</TableCell>
              <TableCell>House Number</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
              return (
                <TableRow
                  hover
                  key={user.email}
                >
                  <TableCell component="th" scope="row">
                    {user.userName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.birthDate}</TableCell>
                  <TableCell>{user.city}</TableCell>
                  <TableCell>{user.streetName}</TableCell>
                  <TableCell>{user.houseNumber}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="edit" onClick={() => handleEdit(user)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(user.email)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
              <Button variant="contained" color="success" onClick={handleLogOutAdmin}>
          Logout
        </Button>

    </Paper>
    
  );
}
SystemAdmin.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

export default SystemAdmin;
