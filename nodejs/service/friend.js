const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');
const timestamp = (new Date()).toISOString();

// Usecase 6b -  Function to send friend request
const inviteFriend = async (user1, user2) => {
  try {

    await db.getDBObject() .query(
      "INSERT into ?? (user1, user2, acceptStatus, requestSentBy, createdAt, updatedAt) values(?, ?, ?,?,?,?)",
      [db.FriendTable, user1, user2, 'Pending', user1, timestamp, timestamp]
  )

  } catch (e) {

    console.error(e)
    console.error('Unable to friend user')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

// Usecase 6a - Function to accept friend request
const acceptFriend = async (user1, user2) => {
  try {
    await db.getDBObject() .query(
      "UPDATE " + db.FriendTable + " SET acceptStatus = 'Accepted', updatedAt = '" + timestamp + "' WHERE user1 = '" + user1 + "' AND user2 = '" +user2 + "'"
      )
  } catch (e) {

    console.error(e)
    console.error('Unable to accept friend request')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

// Usecase 6a - Function to decline friend request
const declineFriend = async (user1, user2) => {
  try {
    await db.getDBObject() .query(
      "UPDATE " + db.FriendTable + " SET acceptStatus = 'Not Accepted', updatedAt = '" + timestamp + "' WHERE user1 = '" + user1 + "' AND user2 = '" +user2 + "'"
      )
  } catch (e) {

    console.error(e)
    console.error('Unable to decline friend request')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};

// Usecase 3a - Function to get new reviews made by a user's friends
const newReviewsByFriends = async (user) => {
  try {
    const reviewByfriends =  await db.getDBObject() .query("SET @user = '"+user+"'; SET @LastLogin = (SELECT lastlogin FROM  users WHERE username = @USER); SELECT * FROM reviewSong WHERE username IN ( SELECT user2 FROM friend WHERE acceptStatus = 'Accepted' AND user1 = @user UNION SELECT user1 FROM friend WHERE acceptStatus = 'Accepted' AND user2 = @user)AND reviewDate > @Lastlogin;");
    
    console.log(reviewByfriends)
    
    return reviewByfriends;

  } catch (e) {

    console.error(e)
    console.error('Unable to get reviews by friends')

    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    
    throw e;
  }
};


module.exports = {
  inviteFriend, acceptFriend, declineFriend, newReviewsByFriends
};
