import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      <header style={{marginBottom: '1rem'}}>
        <h3>
          <span>{`${currentUser.username}'s Profile`}</span>
        </h3>
      </header>
      <p>
        <strong>Username: </strong> {currentUser.username}
      </p>
      <p>
        <strong>First Name: </strong> {currentUser.fname}
      </p>
      <p>
        <strong>Last Name: </strong> {currentUser.lname}
      </p>
      <p>
        <strong>Email: </strong> {currentUser.email}
      </p>
      <p>
        <strong>Profile: </strong> {currentUser.userProfile}
      </p>
    </div>
  );
};

export default Profile;
