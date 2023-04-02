import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import Posts from './Posts';

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/login" replace={true} />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <Posts></Posts>
      {/* <p>
        <strong>Nickname: </strong> {currentUser.nickname}
      </p> */}
    </div>
  );
};

export default Profile;
