import RatingService from "../services/rating.service";
import {useState} from "react";

export const SongModal = (props) => {
    const {setShowSongModal, song} = props
    const [newSongRating, setNewSongRating] = useState(undefined)
    const handleSongRatingChange = event => {
        setNewSongRating(event.target.value)
    }

    const handleSubmitSongRating = async () => {
        await RatingService.postRating(newSongRating, song.songID)
    }
    return (
        <div style={{
            left: 0,
            top: 0,
            position: 'fixed',
            width: '100%',
            height: '100%',
            zIndex: 1,
            backgroundColor: 'lightblue',
            opacity: '97%',
            overflow: 'auto'
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '15%',
                marginTop: '8%',
                marginLeft: '10%',
                backgroundColor: 'cornflowerblue',
                height: '80%',
                width: '80%',
                padding: '20px'
            }}>
                <div style={{display: 'flex', height: '90%', marginBottom: '1rem'}}>
                    <div style={{
                        display: 'flex',
                        width: '50%',
                        flexDirection: 'column',
                        backgroundColor: 'whitesmoke',
                        border: '2px solid cornflowerblue',
                        padding: '1rem'
                    }}>
                        <h4>Song Details</h4>
                        <span>Title: {song.title}</span>
                        <span>Artist Name: {song.fname + ' ' + song.lname}</span>
                        <span>Release Date: {song.releaseDate.slice(0,10)}</span>
                        <span>Song URL: <a href={song.songURL}>Listen</a></span>
                        <span>Artist URL: <a href={song.artistURL}>Learn More</a></span>
                        {/*Need to get song rating for this song*/}
                        <h4 style={{marginTop: '1rem'}}>Average Song Rating:</h4>
                        {/*Nigel: frontend trigger for rating a song and reviewing a song*/}
                        {/* treat the rate button as a front end trigger and add an input box next to it that*/}
                        {/* the rate button sends the value from to the backend.*/}
                        <div>
                            <input  id={song.songID}
                                    name="songRatingInput"
                                    type="text"
                                    value={newSongRating}
                                    onChange={handleSongRatingChange} />
                            <button onClick={handleSubmitSongRating}>Rate</button>
                        </div>

                    </div>
                    <div style={{
                        padding: '1rem',
                        display: 'flex',
                        width: '50%',
                        flexDirection: 'column',
                        backgroundColor: 'whitesmoke',
                        border: '2px solid cornflowerblue'
                    }}>
                        <h4>Song Reviews</h4>
                        <p>Amazing song...</p>
                        <p>Amazing song...</p>
                        <p>Amazing song...</p>
                        <h5 style={{marginTop: '1rem'}}>Add Review Here</h5>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <input style={{width: '100%', height: '5rem'}} />
                            <button>Submit Review</button>
                        </div>
                    </div>
                </div>

                <button style={{marginLeft: '90%', width: '6rem'}} onClick={() => {
                    setShowSongModal(false)
                }}>Close
                </button>

            </div>
        </div>
    )
}