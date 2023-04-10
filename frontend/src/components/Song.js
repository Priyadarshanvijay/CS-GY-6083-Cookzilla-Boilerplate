import SongService from '../services/song.service';
import React, { useEffect } from 'react';
import { Formik, Field, Form, useFormik } from 'formik';

const Song = () => {
  useEffect(() => {
    SongService.getSongs();
  }, []);
  const [values, setValues] = React.useState({});

  const handleChange = event => {
    setValues(prevValues => ({
      ...prevValues,
      // we use the name to tell Formik which key of `values` to update
      [event.target.name]: event.target.value
    }))
  }

  const formik = useFormik({
    initialValues: {
      song: '',
      artist: '',
      album: '',
      genre: '',
      songRating: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
    handleChange
  });
  return (
    <div>
      <h3>Search</h3>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="song">Song</label>
        <input
          id="song"
          name="song"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.song}
        />

        <label htmlFor="artist">Artist</label>
        <input
          id="artist"
          name="artist"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.artist}
        />

        <label htmlFor="album">Album</label>
        <input
          id="album"
          name="album"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.album}
        />
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          name="genre"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.genre}
        />
        <label htmlFor="songRating">Song Rating</label>
        <input
          id="songRating"
          name="songRating"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.songRating}
        />
        <div style={{ marginTop: '1rem' }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Song;
