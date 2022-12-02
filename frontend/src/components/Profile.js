import React from "react";
import { Navigate } from 'react-router-dom';
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  if(!currentUser) {
    return <Navigate to="/login" replace={true} />
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.token.substring(0, 20)} ...{" "}
        {currentUser.token.substr(currentUser.token.length - 20)}
      </p>
      <p>
        <strong>userName: </strong> {currentUser.userName}
      </p>
      <p>
        <strong>Email: </strong> {currentUser.email}
      </p>
    </div>
  );
};

export default Profile;
