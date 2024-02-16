import React from 'react';

const Profile = ({user, logoutUser}) => {
  return (
    <div>
      <h2>User Profile</h2>
      {/* user details */}
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Profile;