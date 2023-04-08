import React, { useState } from 'react';
import '../css/Song.css';
import Search from './Search';

export default function Music() {
  const [results, setResults] = useState(null);
  const handleDataFromChild = (data) => {
    setResults(data);
  };

  return (
    <div className="song-page">
      <header className="song-page-header">
        <h1>FatEar - Songs of the Week</h1>
        <hr></hr>
        <Search onData={handleDataFromChild}></Search>
        <button>Sort By Title</button>
        <button>Sort By Rating</button>
        <div>
          {results && results.length > 0 ? (
            results.map((result) => (
              <div key={result.id}>title: {result.title}</div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      </header>
      {/* <SongList></SongList> */}
    </div>
  );
}
