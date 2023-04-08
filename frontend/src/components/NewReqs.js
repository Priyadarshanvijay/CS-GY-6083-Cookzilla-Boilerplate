import React from 'react';
export default function NewReqs(props) {
  const handleAccept = (usr) => {
    props.onAcceptOrReject(usr, 'accept');
  };

  const handleReject = (usr) => {
    props.onAcceptOrReject(usr, 'reject');
  };

  return (
    <div className="new-reqs-container">
      <h4>New Friend Requests:</h4>
      <ul className="friend-list">
        {props.requests.map((request) => (
          <li className="friend-request">
            <div className="friend-info">
              <div className="friend-name">
                {request[0]} <span> Request sent on {request[1]}</span>
              </div>
            </div>
            <div className="friend-actions">
              <button
                className="add-friend-btn"
                onClick={() => {
                  handleAccept(request[0]);
                }}
              >
                Add Friend
              </button>
              <button
                className="view-request-btn"
                onClick={() => handleReject(request[0])}
              >
                Reject Friend Request
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
