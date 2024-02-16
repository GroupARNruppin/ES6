import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import EditDetails from './FC/EditDetails'
import Login from './FC/Login'
import Profile from './FC/Profile'
import Register from './FC/Register'
import SystemAdmin from './FC/SystemAdmin'

function App() {
  // User details
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

  // logged and array of users
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [users, setUsers] = useState([])

  // loadUsers
  useEffect(() => {
    const storageUsers = JSON.parse(localStorage.getItem("users")) || []
    setUsers(storageUsers)
  }, [])

  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers))
  }

  const registerUser = (newUser) => {
    // varifications
    const updatedUsers = [...users, newUser] // create updated users with the new user and the old users 
    setUsers(updatedUsers)
    updateLocalStorage(updatedUsers)
  }

  const loginUser = ({ username, password }) => {
    const foundUser = users.find(user => user.userName == username && user.password == password)
    if(foundUser){
      setLoggedInUser(foundUser)
    }
  }

  const logoutUser = () =>{
    // log out user implement
    setLoggedInUser(null)
  }

  const deleteUser = (email) =>{
    const updatedUsers = users.filter(user => user.email != email)
    setUsers(updatedUsers)
    updateLocalStorage(updatedUsers)
  }

  const editUser = (updatedUser) =>{
    const updatedUsers = users.map(user => 
      user.email == updatedUser.email ? {...user, ...updatedUser} : user
    )
    setUsers(updatedUsers)
    updateLocalStorage(updatedUsers)
  }
  
  return (
    <div>
      {/* {loggedInUser ? (
        <div>
          <Profile user={loggedInUser} logoutUser={logoutUser}/>
          <EditDetails user={loggedInUser} editUser={editUser}/>
          <SystemAdmin users={users} deleteUser={deleteUser}/>
        </div>
      ) : (
        <div>
          <Register registerUser={registerUser} />
          <Login loginUser={loginUser} /> 
        </div>
      )} */}
          <Register registerUser={registerUser} />
    </div>
    
  );
}

export default App;

