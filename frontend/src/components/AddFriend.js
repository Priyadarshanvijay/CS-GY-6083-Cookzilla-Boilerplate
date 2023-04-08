import React, { useState } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

export default function AddFriend() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-container">
      <h4>Add New Friends: </h4>
      <Form>
        <label htmlFor="username"></label>
        <Input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <br />
        <button type="submit">Submit </button>
      </Form>
    </div>
  );
}
