import React, { useEffect, useState } from 'react';
import Search from './Search';
import SongList from './SongList';
import '../css/Song.css';

export default function Music() {
  const [results, setResults] = useState(null);
  const handleDataFromChild = (data) => {
    setResults(data);
  };

  return (
    <div className="song-page">
      <header className="song-page-header">
        <h4>FatEar -- Songs of the Week</h4>
      </header>
      <SongList></SongList>
      <div className="search-container">
        <Search onData={handleDataFromChild}></Search>
      </div>
      <div className="search-result-container">
        {results && results.length > 0
          ? results.map((result) => (
              <div key={result.id} className="search-result">
                <a href={result.songURL} target="_blank">
                  <p className="song-title">
                    {result.title} By {result.fname} {result.lname}{' '}
                  </p>
                  <p className="song-album">In Album: {result.albumTitle}</p>
                </a>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}
