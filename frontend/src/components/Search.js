import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

const API_URL = 'http://localhost:3000/';

export default function Search(props) {
  const [artist, setArtist] = useState('');
  const [rating, setRating] = useState('');
  const [genre, setGenre] = useState('');
  const form = useRef();

  const onSearch = async (artist, genre, rating) => {
    try {
      const response = await fetch(API_URL + 'querysongs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artist: artist,
          genre: genre,
          rating: rating,
        }),
      });
      const data = await response.json();
      console.log(data);
      props.onData(data['songs']);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(artist, genre, rating);
  };

  return (
    <Form className="search-form" onSubmit={handleSearch} ref={form}>
      <label htmlFor="artist">Search by Artist</label>
      <Input
        type="text"
        name="artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
        className="search-input"
      />
      <label htmlFor="rating">Search by Genre</label>
      <Input
        type="text"
        name="genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        className="rating-input"
      />
      <label htmlFor="rating">Search by Rating</label>
      <Input
        type="number"
        name="rating"
        min="1"
        max="5"
        placeholder="Filter by average rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="genre-input"
      />
      <br />
      <button type="submit" className="search-button">
        Search
      </button>
    </Form>
  );
}
