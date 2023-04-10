import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import '../css/Reviews.css';
import AuthService from '../services/auth.service';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

const API_URL = 'http://localhost:3000/';

export default function RatingSongs() {
    const currentUser = AuthService.getCurrentUser();
    const username = currentUser.username;
    const [songTitle, setSongTitle] = useState("");
    const [rating, setRating] = useState(1);
    const [success, setSuccess] = useState(false);
    const [songRatings, setSongRatings] = useState([]);


    const handleSubmit = (event) => {
      event.preventDefault();
      postSongRating(username, songTitle, rating);
    };

    const required = (value) => {
      if (!value) {
        return (
          <div className="alert alert-danger" role="alert">
            This field is required!
          </div>
        );
      }
    };

    const postSongRating = async (username, songTitle, rating) => {
      try {
        const response = await fetch(API_URL + 'ratesong', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            songTitle,
            rating,
          }),
        });
        if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSongRatings([...songRatings, data]);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
      } catch (err) {
        console.error(err);
      }
    };
    
    useEffect(() => {
      const getSongRatings = async () => {
        try {
          const response = await fetch(
            API_URL + `pastratings?username=${username}`
          );
          const data = await response.json();
          setSongRatings(data);
        } catch (err) {
          console.error(err);
        }
      };
      getSongRatings();
    }, []);


  return (
    <div className="review-rate-container">
      <div className="review-rate">
        <span>Create New Rating</span> 
        {success && (
          <div className="alert alert-success" role="alert">
            Rating added successfully!
          </div>
        )}
        <Form name="rating" onSubmit={handleSubmit}>
          <label htmlFor='songTitle'>Song Title:
            <Input
              name="SongTitle"
              placeholder="Enter song title here"
              value={songTitle}
              onChange={e => setSongTitle(e.target.value)}
              type="text"
              validations={[required]}>
            </Input>
          </label>
          <br />
       
          <label htmlFor="rating">
            Rating:
            <select 
              name="rating" 
              style={{ padding: 10, borderColor: 'lightgray'}}  
              value={rating} 
              onChange={e=> setRating(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <br />
          <br />
          <button type="submit"> 
            Submit Rating
          </button>
        </Form>
        <div className="past-reviews">
            <h2>Your Past Ratings</h2>
            <ul>
              {songRatings.map((Rating) => (
                <li key={Rating.title}>
                  <h3>
                    {Rating.title}
                    {Rating.songTitle}
                  </h3>
                  <p>Stars: {Rating.stars}</p>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
}
