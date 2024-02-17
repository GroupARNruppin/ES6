import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components
import EditDetails from './FC/EditDetails/EditDetails'
import Login from './FC/Login/Login'
import Profile from './FC/Profile/Profile'
import Register from './FC/Register/Register'
import SystemAdmin from './FC/SystemAdmin/SystemAdmin'

function App() {
  // User details
  const [user, setUser] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    imageFile: null,
    firstName: "",
    lastName: "",
    email: "",
    birthDate: new Date(),
    city: "",
    streetName: "",
    houseNumber: 0
  });

  // Logged user and array of users
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users"))) //[]
  // loadUsers
  useEffect(() => {
    const storageUsers = JSON.parse(localStorage.getItem("users")) || []
    setUsers(storageUsers)
  }, [])

  // Update local storage
  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  // Register user
  const registerUser = (newUser) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Welcome!`,
      showConfirmButton: false,
      timer: 1500
    });
    console.log(newUser)
    // varifications
    const updatedUsers = [...users, newUser] // create updated users with the new user and the old users 
    setUsers(updatedUsers)
    updateLocalStorage(updatedUsers)
  }

  // Log in user
  const loginUser = ({ username, password }) => {
    const foundUser = users.find(user => user.userName == username && user.password == password)
    if(foundUser){
      setLoggedInUser(foundUser)
      return true
    }
    return false;
  }

  // Log out user
  const logoutUser = () =>{
    setLoggedInUser(null)
  }

  // Delete user
  const deleteUser = (email) =>{
    const updatedUsers = users.filter(user => user.email != email)
    setUsers(updatedUsers)
    updateLocalStorage(updatedUsers)
  }

  // Edit user
  const editUser = (updatedUser) =>{
    setLoggedInUser(updatedUser)
    const updatedUsers = users.map(user => 
      user.email == updatedUser.email ? {...user, ...updatedUser} : user
    )
    setUsers(updatedUsers)
    updateLocalStorage(updatedUsers)
  }
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/edit-details">edit details</Link>
            </li>
            <li>
              <Link to="/system-admin">system admin</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login loginUser={loginUser}/>} /> 
          <Route path="/register" element={<Register registerUser={registerUser}/>} />
          <Route path="/profile" element={<Profile user={loggedInUser} logoutUser={logoutUser} />} />
          <Route path="/edit-details" element={<EditDetails user={loggedInUser} editUser={editUser}/>} />
          <Route path="/system-admin" element={<SystemAdmin users={users} deleteUser={deleteUser} editUser={editUser}/>} />
        </Routes>
      </div>
    </Router>
    // <div>
    //   {loggedInUser ? (
    //     <div> {
    //         (loginUser.userName == 'admin' && loginUser.password == 'ad12343211ad') ? (
    //           <SystemAdmin users={users} deleteUser={deleteUser}/>
    //         ) : (
    //           <div>
    //             <Profile user={loggedInUser} logoutUser={logoutUser}/>
    //             <EditDetails user={loggedInUser} editUser={editUser}/>
    //           </div>
    //         ) }
    //     </div>
    //   ) : (
    //     <div>
    //       <Login loginUser={loginUser} /> 
    //       <Register registerUser={registerUser} />
    //     </div>
    //   )}
    // </div>
  );
}

export default App;

