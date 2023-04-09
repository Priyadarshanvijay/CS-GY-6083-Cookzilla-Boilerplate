from typing import Optional
from pydantic import BaseModel
from db.main import Database
from errors import internalServerError
import datetime


class Query(BaseModel):
    artist: str
    genre: Optional[str] = ''
    rating: Optional[str] = 0


class QueryService():
    def __init__(self, db: Database):
        self.Database = db

    # query for songs
    def generalQuery(self, userQuery: Query):
        db = self.Database
        query = '''
            SELECT DISTINCT title, fname, lname, albumTitle, songURL
            FROM artist
            NATURAL JOIN artistPerformsSong
            NATURAL JOIN song
            NATURAL JOIN album
            WHERE songID IN 
            (SELECT DISTINCT songID
            FROM song
            NATURAL LEFT OUTER JOIN rateSong
            NATURAL JOIN songGenre
            NATURAL JOIN artist
            WHERE ((genre = %s) AND (fname = %s OR lname = %s))
            GROUP BY song.songID
            HAVING AVG(rateSong.stars) >= %s)
        '''

        try:
            queryResult = db.query(
                query, [userQuery.genre, userQuery.artist, userQuery.artist, userQuery.rating])
            # print(queryResult)
            return {'songs': queryResult['result']}
        except Exception as e:
            raise internalServerError.InternalServerError()

    # query for songs of the week
    def songOfWeek(self):
        db = self.Database
        query = '''
            SELECT DISTINCT title, fname, lname, songURL
            FROM song NATURAL JOIN artist NATURAL JOIN artistPerformsSong
            WHERE songID IN 
            (SELECT DISTINCT songID
            FROM rateSong
            GROUP BY songID
            HAVING AVG(stars) >= 3)
            ORDER BY RAND() LIMIT 7; 
        '''
        try:
            queryResult = db.query(
                query)
            return {'songs': queryResult['result']}
        except Exception as e:
            print(e)
            raise internalServerError.InternalServerError()

    # return new items of interest, takes in username as query parameter
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

    # return new songs by artists the user is a fan of
    def newSongs(self, username):
        db = self.Database
        try:
            queryResult = db.query(
                ("SELECT title, fname, lname FROM song NATURAL JOIN userFanOfArtist NATURAL JOIN artistPerformsSong NATURAL JOIN artist WHERE username = %s ORDER BY releaseDate DESC LIMIT 10;"), [username])
            return queryResult['result']
        except Exception as e:
            print(e)
            raise internalServerError.InternalServerError()
