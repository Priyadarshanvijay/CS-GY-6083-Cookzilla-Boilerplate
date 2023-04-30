// Added by Nigel and adapted from recipe.js
const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');

// Nigel: Do I just need to pass the stars and ratingDate? Can I access the username and songID through a variable?
const insertRating = async (username, songID, stars) => {
  try {
    const ratingDate = new Date()
      .toISOString()
      .split('T')
      .join(' ')
      .split('Z')
      .join('');
    const insertResult = await db.getDBObject()
    .query(
      "INSERT into ?? (username, songID, stars, ratingDate) values(?, ?, ?, ?)",
      [db.RateSongTable, username, songID, stars, ratingDate]
      
    )
    console.log(insertResult)
    return {
      ratingID: insertResult.insertId,
      username,
      songID,
      stars,
      ratingDate
    };
  } catch (e) {
    console.error("unable to insert rating");
    console.error(e);
    throw new InternalServerError();
  }
};

module.exports = {
  insertRating
};