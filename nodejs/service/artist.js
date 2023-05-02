const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');


//  Usecase 3b - Function to get new songs by artist whom user is a fan of
const getNewSongsByFavoriteArtist = async (user) => {

  try {
    const newSongs =  await db.getDBObject() .query("SET @user = '"+user+"'; SET @LastLogin = (SELECT lastlogin FROM  users WHERE username = @USER); SELECT * FROM song s JOIN artistPerformsSong a ON s.songID = a.songID WHERE a.artistID IN (SELECT artistID FROM userFanOfArtist WHERE username = @user) AND s.releaseDate > @LastLogin;");
    
    console.log(newSongs)
    
    return newSongs;
    
  } catch (e) {

    console.error(e)
    console.error('Unable to get new songs by artist whom user is a fan of')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

module.exports = {
  getNewSongsByFavoriteArtist
};
