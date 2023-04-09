import React, { useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import Post from './Post';
const API_URL = 'http://localhost:3000/';

export default function Posts() {
  const [data, setData] = useState([]);
  const [newSongs, setNewSongs] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const username = currentUser.username;
  // const username = 'Yuzu66'; //hardcoding it just for testing purposes

  const fetchData = async (username) => {
    try {
      const response = await fetch(API_URL + `newitems?username=${username}`, {
        method: 'GET',
      });
      const result = await response.json();
      setData(result['reviews']);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSongs = async (username) => {
    try {
      const response = await fetch(API_URL + `newsongs?username=${username}`, {
        method: 'GET',
      });
      const result = await response.json();
      setNewSongs(result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData(username);
    fetchSongs(username);
  }, []);

  return (
    <div className="newitems">
      {data.length === 0 && (
        <h4>It looks like you are all caught up with new reviews! </h4>
      )}

      {data.length !== 0 &&
        data.map((item) => (
          <Post
            reviewedItem={item.reviewedItem}
            author={item.username}
            date={item.reviewDate}
            body={item.reviewText}
          ></Post>
        ))}

      {newSongs.length !== 0 && (
        <div className="new-songs">
          <h4>Here are some new songs you might like:</h4>
          {newSongs.map((item) => (
            <div>
              <span>
                {item.title} By {item.fname} {item.lname}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
