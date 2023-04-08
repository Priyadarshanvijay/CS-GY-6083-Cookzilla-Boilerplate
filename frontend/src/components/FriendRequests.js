import React, { useState } from 'react';
// import Form from 'react-validation/build/form';
// import Input from 'react-validation/build/input';
import '../css/Friend.css';
import FriendList from './FriendList';
import NewReqs from './NewReqs';
import AddFriend from './AddFriend';

const API_URL = 'http://localhost:3000/';

export default function FriendRequests() {
  
  return (
    <div className="friend-request-window">
      <NewReqs></NewReqs>
      <AddFriend></AddFriend>
      <FriendList></FriendList>
    </div>
  );
}
