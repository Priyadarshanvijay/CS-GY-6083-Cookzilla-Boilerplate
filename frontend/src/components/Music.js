import React, { useState } from 'react';
import '../css/Song.css';
import SongList from './SongList';
import Search from './Search';

export default function Music() {
  const [results, setResults] = useState([]);

  return (
    <div className="song-page">
      <header className="song-page-header">
        <h1>FatEar - Songs of the Week</h1>
        <hr></hr>
        {/* TODO */}
        <Search onResults={setResults()}></Search>
        <button>Sort By Title</button>
        <button>Sort By Rating</button>
        {/* <div className="queried-songs">
          {results.map((result) => (
            <div key={result.title}>
              {result.title} by {result.fname} {result.lname}
            </div>
          ))}
        </div> */}
      </header>
      {/* <SongList></SongList> */}
    </div>
  );
}
