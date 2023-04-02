import React from 'react';
import RatingSongs from './RatingSongs.js';

export default function Song({ songName, artist, imageSrc, rating }) {
  return (
    <div className="song">
      <span>
        {songName} by {artist}
      </span>
      <RatingSongs val={rating}></RatingSongs>
    </div>
  );
}
