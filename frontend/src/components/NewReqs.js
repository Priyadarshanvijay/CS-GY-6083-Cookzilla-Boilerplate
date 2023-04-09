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
      {props.requests.length === 0 ? (
        <h4>You don't have any new friend requests </h4>
      ) : (
        <h4>You have {props.requests.length} new friend requests: </h4>
      )}
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
