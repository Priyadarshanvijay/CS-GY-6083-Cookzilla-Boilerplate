import React, { useEffect, useState } from 'react';
import '../css/Friend.css';
import FriendList from './FriendList';
import NewReqs from './NewReqs';
import AddFriend from './AddFriend';
import AuthService from '../services/auth.service';

const API_URL = 'http://localhost:3000/';

export default function FriendRequests() {
  const currentUser = AuthService.getCurrentUser();
  const [friends, setFriends] = useState([]);
  const [reqs, setReqs] = useState([]);

  // fetch friend and friend requests from backend
  useEffect(() => {
    fetch(API_URL + `getfriends?username=${currentUser.username}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setFriends(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    fetch(API_URL + `getfriendsreqs?username=${currentUser.username}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setReqs(data))
      .catch((error) => console.log(error));
  }, []);

  // handle accepting or declining a friend request
  const handleReq = (sender, userchoice) => {
    fetch(API_URL + 'managereqs', {
      method: 'POST',
      body: JSON.stringify({
        usr_from: sender,
        usr_to: currentUser.username,
        operation: userchoice,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (userchoice == 'accept') {
          setFriends([...friends, data]);
        }
        setReqs(reqs.filter((r) => r[0] !== sender));
        return 1;
      })
      .catch((error) => console.log(error));
  };

  // handle adding a new friend
  const handleAddFriend = (newFriend) => {
    fetch(API_URL + 'sendreq', {
      method: 'POST',
      body: JSON.stringify({
        usr_from: currentUser.username,
        usr_to: newFriend,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="friend-request-window">
      <NewReqs requests={reqs} onAcceptOrReject={handleReq}></NewReqs>
      <AddFriend onAddFriend={handleAddFriend}></AddFriend>
      <FriendList friends={friends}></FriendList>
    </div>
  );
}
