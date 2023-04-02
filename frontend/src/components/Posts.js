import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import Post from './Post';
const API_URL = 'http://localhost:3000/';

export default function Posts() {
  const [data, setData] = useState([]);
  //   const currentUser = AuthService.getCurrentUser();
  //   const username = currentUser.username;
  const username = 'Yuzu66'; //hardcoding it just for testing purposes
  const fetchData = async (username) => {
    try {
      const response = await fetch(API_URL + 'newitems?username=' + username, {
        method: 'GET',
      });
      const result = await response.json();
      setData(result['reviews']);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(username);
  }, []);

  return (
    <div className="newitems">
      <h4>You might find new reviews interesting: </h4>
      {data.map((item) => (
        <Post
          reviewedItem={item.reviewedItem}
          author={item.username}
          date={item.reviewDate}
          body={item.reviewText}
        ></Post>
      ))}
    </div>
  );
}
