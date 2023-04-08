from pydantic import BaseModel
from db.main import Database
from errors import internalServerError
import datetime


class Query(BaseModel):
    query: str
    rating: str


class QueryService():
    def __init__(self, db: Database):
        self.Database = db

    # query for songs
    def generalQuery(self, userQuery: Query):
        db = self.Database
        try:
            queryResult = db.query(
                ("SELECT title FROM song NATURAL JOIN songGenre WHERE genre = %s"), [userQuery.query])
            return {'songs': queryResult['result']}
        except Exception as e:
            raise internalServerError.InternalServerError()

    # return new items of interest, takes in username as query param
    def newItems(self, username):
        db = self.Database
        try:
            queryResult = db.query(
                ("SELECT username, title as reviewedItem, reviewText, reviewDate FROM user NATURAL JOIN reviewSong NATURAL JOIN song WHERE (username IN (SELECT user1 from friend WHERE user2 = %s AND acceptStatus = 'Accepted') OR username IN (SELECT user2 FROM friend WHERE user1 = %s AND acceptStatus ='Accepted') OR username IN (SELECT follows FROM follows WHERE follower = %s)) AND reviewDate > (SELECT lastLogin FROM user WHERE username = %s) AND reviewText IS NOT NULL UNION SELECT username, albumID as reviewedItem, reviewText, reviewDate FROM user NATURAL JOIN reviewAlbum WHERE (username IN (SELECT user1 from friend WHERE user2 =%s AND acceptStatus = 'Accepted') OR username IN (SELECT user2 FROM friend WHERE user1 = %s AND acceptStatus ='Accepted') OR username IN (SELECT follows FROM follows WHERE follower = %s)) AND reviewDate > (SELECT lastLogin FROM user WHERE username = %s) AND reviewText IS NOT NULL"), [username, username, username, username, username, username, username, username])
            print(queryResult)
            return {'reviews': queryResult['result']}
        except Exception as e:
            print(e)
            raise internalServerError.InternalServerError()
    
