import React, { useState } from 'react';
import Song from './Song';

export default function SongList() {
  //fetch from API, but we hardcode the data for now
  let [songs, setSongs] = useState([
    {
      songName: 'death bed',
      artist: 'Cookiee Kawaii',
      imageSrc: 'vibe.jpg',
      rating: 2,
    },
    {
      songName: 'Vide',
      artist: 'Cookiee Kawaii',
      imageSrc: 'vibe.jpg',
      rating: 1,
    },
    { songName: 'Skyline', artist: 'FJK', imageSrc: 'vibe.jpg', rating: 4 },
    {
      songName: 'Moral of the story',
      artist: 'Cookiee Kawaii',
      imageSrc: 'vibe.jpg',
      rating: 3,
    },
    { songName: 'Greener', artist: 'FJK', imageSrc: 'vibe.jpg', rating: 5 },
  ]);

  //adding a new song
  function add() {
    setSongs((x) => [
      ...x,
      { songName: 'Greener', artist: 'FJK', imageSrc: 'vibe.jpg', rating: 5 },
    ]);
  }

  return (
    <div>
      {songs.map((x) => (
        <Song
          songName={x.songName}
          rating={x.rating}
          imageSrc={x.imageSrc}
          artist={x.artist}
        ></Song>
      ))}
      <button onClick={add}>click me to add a song</button>
    </div>
  );
}
