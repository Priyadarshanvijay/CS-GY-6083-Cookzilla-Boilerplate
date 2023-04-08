import React from 'react';

export default function FriendList() {
  return (
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
  );
}
