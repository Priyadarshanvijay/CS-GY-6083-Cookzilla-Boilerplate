import React from 'react';

export default function RatingSongs({ val }) {
  function filledStar(val) {
    let jsx = [];
    while (val !== 0) {
      jsx.push(<span className="purple">&#9733;</span>);
      val--;
    }
    return jsx;
  }
  return <span className="song-rating">{filledStar(val)}</span>;
}
