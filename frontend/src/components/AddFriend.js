import React, { useState } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

export default function AddFriend(props) {
  const [newFriend, setNewFriends] = useState('');

  const handleSearchInputChange = (event) => {
    setNewFriends(event.target.value);
  };

  return (
    <div className="search-container">
      <h4>Add New Friends: </h4>
      <Form>
        <label htmlFor="username"></label>
        <Input
          type="text"
          placeholder="Search by username"
          value={newFriend}
          onChange={handleSearchInputChange}
        />
        <br />
        <button type="submit" onClick={() => props.onAddFriends(newFriend)}>
          Submit{' '}
        </button>
      </Form>
    </div>
  );
}
