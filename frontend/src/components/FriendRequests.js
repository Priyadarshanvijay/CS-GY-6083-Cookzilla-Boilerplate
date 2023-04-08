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
      <div className="new-reqs-container">
        <h4>New Friend Requests: </h4>
        <ul className="friend-list">
          <li className="friend-request">
            <div className="friend-info">
              <div className="friend-name">
                John Doe
                <span> sent on 2023-04-03</span>
              </div>
            </div>
            <div className="friend-actions">
              <button className="add-friend-btn">Add Friend</button>
              <button className="view-request-btn">
                Reject friend request
              </button>
            </div>
          </li>
          <li className="friend-request">
            <div className="friend-info">
              <div className="friend-name">
                Jane Smith <span>sent on 2023-04-03</span>
              </div>
            </div>
            <div className="friend-actions">
              <button className="add-friend-btn">Add Friend</button>
              <button className="view-request-btn">
                Reject friend request
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div className="search-container">
        <h4>Add New Friends: </h4>
        <Form>
          <label htmlFor="username"></label>
          <Input
            type="text"
            placeholder="Search by username"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <br />
          <button type="submit">Submit </button>
        </Form>
      </div>
      <div className="friends-container">
        <h4>Your Friend List: </h4>
        <ul className="friend-list">
          <li className="friend">
            <div className="friend-info">
              <div className="friend-name">John Doe</div>
            </div>
          </li>
          <li className="friend">
            <div className="friend-info">
              <div className="friend-name">Jame Smith</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
