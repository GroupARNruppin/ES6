import React from 'react';

const EditDetails = ({ user, editUser }) => {
    const [updatedUser, setUpdatedUser] = setState({ ...user })

    handleEdit = ()=>{
        editUser(updatedUser)
    }

    return (
        <div>
            {/* Your JSX code here */}
        </div>
    );
};

export default EditDetails;