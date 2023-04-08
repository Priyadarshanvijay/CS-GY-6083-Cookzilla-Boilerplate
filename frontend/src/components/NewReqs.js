import React from 'react';

export default function NewReqs() {
  return (
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
            <button className="view-request-btn">Reject friend request</button>
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
            <button className="view-request-btn">Reject friend request</button>
          </div>
        </li>
      </ul>
    </div>
  );
}
