import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
// import '../css/search.css';

// import CheckButton from 'react-validation/build/button';
const API_URL = 'http://localhost:3000/';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Search({ onResults }) {
  const [query, setQuery] = useState('');
  const [rating, setRating] = useState('');
  const form = useRef();

  const onSearch = async (query, rating) => {
    try {
      const response = await fetch(API_URL + 'querysongs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          rating,
        }),
      });
      const data = await response.json();
      onResults(data);
      return data;
    } catch (error) {
      // handle error
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query, rating);
  };

  return (
    <Form className="search-form" onSubmit={handleSearch} ref={form}>
      <label htmlFor="query"></label>
      <Input
        type="text"
        name="query"
        placeholder="Search by title, artist or album"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        validations={[required]}
      />
      <label htmlFor="rating"></label>
      <Input
        type="number"
        name="rating"
        placeholder="Filter by average rating"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="rating-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </Form>
  );
}
