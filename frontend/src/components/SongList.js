import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/';

export default function SongList() {
  const [songs, setSongs] = useState(null);

  useEffect(() => {
    fetch(API_URL + 'songsOfWeek', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setSongs(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="songs-of-week">
      {songs && (
        <ul>
          {songs['songs'].map((x) => (
            <li className="song">
              <span>
                {x.title} By {x.fname} {x.lname}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
