import React, { useState } from 'react';
import '../css/playlist.css';

export default function Playlist() {
  const [playlists, setPlaylists] = useState([]);

  const addPlaylist = (playlist) => {
    setPlaylists([...playlists, playlist]);
  };

  const removePlaylist = (index) => {
    const newPlaylists = [...playlists];
    newPlaylists.splice(index, 1);
    setPlaylists(newPlaylists);
  };

  const editPlaylist = (index, playlist) => {
    const newPlaylists = [...playlists];
    newPlaylists[index] = playlist;
    setPlaylists(newPlaylists);
  };

  return (
    <div className="playlist">
      <h2>My Playlists</h2>
      <ul>
        {playlists.map((playlist, index) => (
          <li key={index}>
            <h3>{playlist.name}</h3>
            <p>{playlist.description}</p>
            <ul>
              {playlist.songs.map((song, index) => (
                <li key={index}>
                  {song.title} by {song.artist}
                </li>
              ))}
            </ul>
            <button onClick={() => removePlaylist(index)}>
              Remove Playlist
            </button>
            <button onClick={() => editPlaylist(index, playlist)}>
              Edit Playlist
            </button>
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newPlaylist = {
            name: e.target.name.value,
            description: e.target.description.value,
            private: e.target.private.checked,
            songs: [],
          };
          addPlaylist(newPlaylist);
        }}
      >
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Description:
          <textarea name="description"></textarea>
        </label>
        <label>
          Private:
          <input type="checkbox" name="private" />
        </label>
        <button type="submit">Add Playlist</button>
      </form>
    </div>
  );
}
