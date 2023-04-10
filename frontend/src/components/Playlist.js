import React, { useEffect, useState } from 'react';
import '../css/playlist.css';
import AuthService from '../services/auth.service';
import CreatePlaylist from './CreatePlaylist';
import AddSongsToPlaylist from './AddSongsToPlaylist';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';

const API_URL = 'http://localhost:3000/';

export default function Playlist() {
  const currentUser = AuthService.getCurrentUser();
  const username = currentUser.username;
  const [playlists, setPlaylists] = useState([]);
  const [description, setDescription] = useState([]);
  const [playlistName, setPlaylistName] = useState([]);
  const [title, setTitle] = useState([]);
  const [addedToPlaylistName, setAddedToPlaylistName] = useState([]);

  // fetch playlists(playlistName, title[]) from backend
  useEffect(() => {
    fetch(API_URL + `/getplaylists?username=${currentUser.username}`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setPlaylists(data))
      .catch((error) => console.log(error));
  }, []);

  //fetch songs in a playlist -- display songs in playlist onClick
  //!LOGIC IS OFF. NEED TO COMBINE THIS INTO THE ONE ABOVE AND USE A CONDITIONAL TO DISPLAY THE SONGS
  // const fetchSongs = (playlistName) => {
  //   const playlistData = {
  //     playlistName: playlistName,
  //     username: currentUser.username,
  //   };

  //   fetch(
  //     API_URL +
  //       `/getsongsinplaylist?playlistData=${JSON.stringify(playlistData)}`,
  //     {
  //       method: 'GET',
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setSongs(data))
  //     .catch((error) => console.log(error));
  // };

  const handleSubmitPlaylist = (event) => {
    event.preventDefault();
    addPlaylist(username, description, playlists);
  };

  const handlePlaylistNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  // handle adding a new playlist
  const addPlaylist = (playlistName, description) => {
    fetch(API_URL + 'createplaylist', {
      method: 'POST',
      body: JSON.stringify({
        playlistName: playlistName,
        description: description,
        username: currentUser.username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPlaylists([...playlists, data]);
      })
      .catch((error) => console.log(error));
  };

  // addind a song to a playlist
  const addSong = (playlistName, song) => {
    fetch(API_URL + '/addtoplaylist', {
      method: 'POST',
      body: JSON.stringify({
        playlistName: playlistName,
        song: song,
        username: currentUser.username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPlaylists([...playlists, data]);
      })
      .catch((error) => console.log(error));
  };

  //invoked onclick of delete button
  const removePlaylist = async (playlistToRemove) => {
    const response = await fetch(API_URL + 'deleteplaylist', {
      method: 'DELETE',
      body: JSON.stringify({
        playlistName: playlistToRemove,
        username: currentUser.username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const newPlaylists = [...playlists];
      const playlistsToRemove = playlists.filter(
        (playlist) => playlist.playlistName === playlistToRemove
      );
      setPlaylists(newPlaylists);
    }
  };

  return (
    <div className="playlist-container">
      {playlists.length == 0 ? (
        <h4>You do not have any playlist for now</h4>
      ) : (
        <h4>My Playlists</h4>
      )}
      <ul>
        {playlists.map((playlist) => (
          <div key={playlist.playlistName}>
            <h2>{playlist.playlistName}</h2>
            <button onClick={() => fetchSongs(playlist.playlistName)}>
              Show songs
            </button>
            <ul>
              {playlist.songsInPlaylist.map((song) => (
                <li key={song}>{song}</li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
      <CreatePlaylist></CreatePlaylist>
      <div className="playlist">
        <Form name="newplaylist" onSubmit={handleSubmitPlaylist}>
          <label htmlFor="playlistName">
            New Playlist Name:
            <Input
              name="playlistName"
              type="text"
              value={playlistName}
              onChange={handlePlaylistNameChange}
              validations={[required]}
            ></Input>
          </label>
          <label htmlFor="description">
            Description:
            <Input
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              validations={[required]}
            ></Input>
          </label>
          <button type="submit">Create New Playlist</button>
        </Form>
      </div>

      <AddSongsToPlaylist></AddSongsToPlaylist>
      <div className="playlist">
        <Form name="addsong" onSubmit={handleSubmitSong}>
          <label>
            Song:
            <Input
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              validations={[required]}
            ></Input>
          </label>
          <label>
            Playlist Name:
            <Input
              name="playlistName"
              type="text"
              value={addedToPlaylistName}
              onChange={(e) => setAddedToPlaylistName(e.target.value)}
              validations={[required]}
            ></Input>
          </label>
          <button type="submit">Add Song To Playlist</button>
        </Form>
      </div>
    </div>
  );
}
