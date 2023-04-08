import React from 'react';
export default function NewReqs(props) {
  const handleAccept = (request) => {
    props.onAcceptOrReject(request, 'accept');
  };

  const handleReject = (request) => {
    props.onAcceptOrReject(request, 'reject');
  };

  return (
    <div className="new-reqs-container">
      <h4>New Friend Requests:</h4>
      <ul className="friend-list">
        {props.requests.map((request) => (
          <li className="friend-request">
            <div className="friend-info">
              <div className="friend-name">
                {request.name} <span>sent on {request.date}</span>
              </div>
            </div>
            <div className="friend-actions">
              <button
                className="add-friend-btn"
                onClick={() => handleAccept(request)}
              >
                Add Friend
              </button>
              <button
                className="view-request-btn"
                onClick={() => handleReject(request)}
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
