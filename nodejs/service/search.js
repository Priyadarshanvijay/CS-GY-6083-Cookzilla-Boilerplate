const db = require('../db/main');

const getSearchResults = async (song, artist, album, genre, songRating) => {
  try {
    let artistQuery = ''
    let albumQuery = ''
    let genreQuery = ''
    let songRatingQuery = ''
    const filters = []

    if (song){
      filters.push(`song.title = "${song}"`)
    }
    if (artist){
      artistQuery = 'LEFT JOIN artistPerformsSong ON song.songID = artistPerformsSong.songID ' +
          'LEFT JOIN artist ON artist.artistID = artistPerformsSong.artistID'
      const artistFullName = artist.split(' ')
      filters.push(`artist.fname = "${artistFullName[0]}" AND artist.lname = "${artistFullName[1]}"`)
    }
    if (album) {
      albumQuery = 'LEFT JOIN songInAlbum on song.songID = songInAlbum.songID ' +
          'LEFT JOIN album ON album.albumID =' +
          ' songInAlbum.albumID'
      filters.push(`album.title = "${album}"`)
    }
    if (genre){
      genreQuery = 'LEFT JOIN songGenre ON song.songID = songGenre.songID'
      filters.push(`songGenre.genre = "${genre}"`)
    }

    if (songRating){
      songRatingQuery = 'LEFT JOIN rateSong ON song.songID = rateSong.songID'
      filters.push(`rateSong.stars >= ${songRating}`)
    }

    const filtersQueryString = filters.join(' AND ')
console.log('SELECT * FROM song ' + artistQuery + albumQuery + genreQuery + songRatingQuery
    + ' WHERE '
    + filtersQueryString)
    const searchResults = await db.getDBObject().query('SELECT * FROM song ' + artistQuery + albumQuery + genreQuery + songRatingQuery
        + ' WHERE '
        + filtersQueryString)
    console.log(searchResults)
    return searchResults;
  } catch (e) {
    console.error(e)
    console.error('unable to get songs')
    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    throw e;
  }
}


module.exports = {
  getSearchResults
}