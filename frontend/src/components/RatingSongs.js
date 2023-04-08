import React from 'react';
import '../css/Reviews.css';

// export default function RatingSongs({ val }) {
//   function filledStar(val) {
//     let jsx = [];
//     while (val !== 0) {
//       jsx.push(<span className="purple">&#9733;</span>);
//       val--;
//     }
//     return jsx;
//   }
//   return <span className="song-rating">{filledStar(val)}</span>;
// }

export default function RatingSongs() {
  return (
    <div className="review-rate-container">
      <div className="review-rate">
        <span>Create New Rating</span>
        <label>Song Title:</label>
        <input
          name="SongTitle"
          type="text"
          placeholder="Enter song title here"
        ></input>
        <br />
        <label for="Star">Rating:</label>
        <select name="stars" id="Star" style={{ padding: 10 }}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <br />
        <button type="submit">Submit Rating</button>
      </div>
      <div className="history">
        <div className="ratings">
          <h3>Your Past Ratings</h3>
          TODO
        </div>
      </div>
    </div>
  );
}
