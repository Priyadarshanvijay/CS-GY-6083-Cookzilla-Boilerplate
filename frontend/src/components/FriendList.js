import React from 'react';

export default function FriendList(props) {
  return (
    <div className="friends-container">
      <h4>Your Friend List: </h4>
      <ul className="friend-list">
        {props.friends.map((friend) => (
          <li className="friend">
            <div className="friend-info">
              <div className="friend-name">{friend}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
