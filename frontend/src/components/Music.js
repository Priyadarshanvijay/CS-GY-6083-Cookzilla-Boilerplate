import React from 'react';
import '../css/Song.css';
import SongList from './SongList';

export default function Music() {
  return (
    <div className="song-page">
      <header className="song-page-header">
        <h1>FatEar - Songs of the Week</h1>
        <hr></hr>
        {/* TODO */}
        <button>Sort By Title</button>
        <button>Sort By Rating</button>
      </header>
      <SongList></SongList>
    </div>
  );
}
