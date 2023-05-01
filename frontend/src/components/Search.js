import SearchService from '../services/search.service';
import React, {useEffect, useState} from 'react';
import {useFormik} from 'formik';
import {isEmpty} from "lodash";
import AuthService from "../services/auth.service";
import RatingService from '../services/rating.service';

const Search = () => {
    const [values, setValues] = useState({});
    const [isDisabled, setIsDisabled] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [newSongRating, setNewSongRating] = useState({})
    const handleChange = event => {
        setHasSubmitted(false)
        setValues(prevValues => ({
            ...prevValues,
            // we use the name to tell Formik which key of `values` to update
            [event.target.name]: event.target.value
        }))
    }

    const handleSongRatingChange = event => {
        setNewSongRating(prevValues => ({
            ...prevValues,
            [event.target.id]: event.target.value
        }))
    }

    const handleSubmit = async (values) => {
        setHasSubmitted(true)
        const searchResults = await SearchService.getSearchResults({...values})
        setSearchResults(searchResults)
    }

    const handleSubmitSongRating = async (songID) => {
        const user = AuthService.getCurrentUser()
        await RatingService.postRating(newSongRating[songID], user, songID)
    }


    const formik = useFormik({
        initialValues: {
            song: '',
            artist: '',
            album: '',
            genre: '',
            songRating: '',
        },
        onSubmit: (values) => handleSubmit(values),
        handleChange,
        validate: (values) => {
            const errors = {}
            if ((values.songRating < 1 || values.songRating > 5) && values.songRating !== ''){
                errors.songRating = 'Invalid song rating, Please enter a value between 1 - 5'
            }
            return errors;
        },
        validateOnChange: true
    });
    useEffect(() => {
        if (Object.values(formik.values).every((v) => !v)) {
            setIsDisabled(true)
        } else {
            setIsDisabled(false)
        }
    }, [formik.values])

    const currentUser = AuthService.getCurrentUser();
    const handleInputChange = (e) => {
        setHasSubmitted(false)
        setSearchResults(undefined)
        formik.handleChange(e)
    }
    return (
        <div style={{display: 'flex'}}>
            <div>
                <h3>Search</h3>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="song">Song</label>
                    <input
                        id="song"
                        name="song"
                        type="text"
                        onChange={handleInputChange}
                        value={formik.values.song}
                    />

                    <label htmlFor="artist">Artist</label>
                    <input
                        id="artist"
                        name="artist"
                        type="text"
                        onChange={handleInputChange}
                        value={formik.values.artist}
                    />

                    <label htmlFor="album">Album</label>
                    <input
                        id="album"
                        name="album"
                        type="text"
                        onChange={handleInputChange}
                        value={formik.values.album}
                    />
                    <label htmlFor="genre">Genre</label>
                    <input
                        id="genre"
                        name="genre"
                        type="text"
                        onChange={handleInputChange}
                        value={formik.values.genre}
                    />
                    {/*add validation: allow 1-5 only*/}
                    <label htmlFor="songRating">Song Rating</label>
                    <input
                        id="songRating"
                        name="songRating"
                        type="text"
                        onChange={handleInputChange}
                        value={formik.values.songRating}
                    />
                    {formik.errors.songRating && <span style={{color: "red", fontSize:'10px'}}>{formik.errors.songRating}</span>}
                    <div style={{marginTop: '1rem'}}>
                        <button type="submit" disabled={isDisabled}>Submit</button>
                    </div>
                </form>
            </div>
            {!hasSubmitted ? <div></div> : isEmpty(searchResults) ?
                <div style={{marginLeft: '10rem'}}> There are no results from your search. Please try again. </div> :
                <table style={{marginLeft: '10rem', height: 'fit-content'}}>
                    <thead>
                    <tr>
                        <th>Song</th>
                        <th>Release Date</th>
                        {formik.values.artist && <th>Artist</th>}
                        {formik.values.album && <th>Album</th>}
                        {formik.values.genre && <th>Genre</th>}
                        {formik.values.songRating && <th>Song Rating</th>}
                        {!isEmpty(currentUser) && <th>Rate</th>}
                        {!isEmpty(currentUser) && <th>Review</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {searchResults.map((res, idx) => {
                        return (<tr key={idx}>
                            <td><a href={res.songURL}>{res.title}</a></td>
                            <td>{res.releaseDate.slice(0, 10)}</td>
                            {formik.values.artist && <td>{res.fname + ' ' + res.lname}</td>}
                            {formik.values.album && <td>{res.albumTitle}</td>}
                            {formik.values.genre && <td>{res.genre}</td>}
                            {formik.values.songRating && <td>{res.avgRating}</td>}
                            {/*Nigel: frontend trigger for rating a song and reviewing a song*/}
                            {/* treat the rate button as a front end trigger and add an input box next to it that*/}
                            {/* the rate button sends the value from to the backend.*/}
                            {!isEmpty(currentUser) && <td><input
                                id={res.songID}
                                name="songRatingInput"
                                type="text"
                                value={newSongRating[res.songID]}
                                onChange={handleSongRatingChange}
                            />
                                <button onClick={() => {
                                    handleSubmitSongRating(res.songID)
                                }}>Rate
                                </button>
                            </td>}
                            {!isEmpty(currentUser) && <td>
                                <button onClick={() => {
                                }}>Review
                                </button>
                            </td>}
                        </tr>)
                    })}
                    </tbody>
                </table>}

        </div>

    );
};

export default Search;