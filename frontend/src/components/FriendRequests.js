import React, { useState } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import '../css/Friend.css';

const API_URL = 'http://localhost:3000/';
export default function FriendRequests() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="friend-request-window">
      <div className="search-container">
        <h2>Add Friends</h2>
        <Form>
          <label htmlFor="username"></label>
          <Input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </Form>
      </div>
      <h2>Friend Requests</h2>
      <ul className="friend-list">
        <li className="friend-request">
          <div className="friend-info">
            <img src="https://example.com/avatar1.jpg" alt="Avatar" />
            <div className="friend-name">John Doe</div>
          </div>
          <div className="friend-actions">
            <button className="view-friend-btn">View Profile</button>
            <button className="add-friend-btn">Add Friend</button>
            <button className="view-request-btn">Reject friend request</button>
          </div>
        </li>
        <li className="friend-request">
          <div className="friend-info">
            <img src="https://example.com/avatar2.jpg" alt="Avatar" />
            <div className="friend-name">Jane Smith</div>
          </div>
          <div className="friend-actions">
            <button className="view-friend-btn">View Profile</button>
            <button className="add-friend-btn">Add Friend</button>
            <button className="view-request-btn">Reject friend request</button>
          </div>
        </li>
      </ul>
    </div>
  );
}
