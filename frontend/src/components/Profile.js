import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import FriendRequests from './FriendRequests';
import Posts from './Posts';
import Reviews from './Reviews';

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
      {/* items of interest */}
      <Posts></Posts>
      {/* reviews and ratings */}
      <Reviews></Reviews>
      {/* friends and friend requests  */}
      <FriendRequests></FriendRequests>
    </div>
  );
};

export default Profile;
