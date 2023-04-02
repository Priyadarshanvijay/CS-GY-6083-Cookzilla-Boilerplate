from pydantic import BaseModel
from errors import internalServerError
import logging as logger
from db.main import Database
from datetime import datetime
from typing import Optional


class InsertSongReview(BaseModel):
    username: str
    songID: Optional[str] = None
    songTitle: str
    reviewText: str


class InsertSongRating(BaseModel):
    username: str
    songID: Optional[str] = None
    songTitle: str
    rating: int


class AccountService():

    def __init__(self, db: Database):
        self.Database = db

    def insertSongReview(self, review: InsertSongReview):
        db = self.Database
        try:
            current_date = datetime.now().strftime('%Y-%m-%d')
            song = db.query(
                "SELECT songID FROM song WHERE title = %s", [review.songTitle])
            if 'result' in song and len(song['result']) > 0:
                songID = song['result'][0]['songID']
                review.songID = songID
            insertResult = db.query(
                ("INSERT into reviewSong values(%s, %s, %s, %s)"),
                [review.username, review.songID, review.reviewText, current_date]
            )

            return {
                "reviewID": insertResult['insertId'],
                **review.dict()
            }
        except Exception as e:
            logger.error("Unable to insert song review/rating")
            logger.error(e)
            raise internalServerError.InternalServerError()

    def insertSongRating(self, review: InsertSongRating):
        db = self.Database
        try:
            current_date = datetime.now().strftime('%Y-%m-%d')
            song = db.query(
                "SELECT songID FROM song WHERE title = %s", [review.songTitle])
            if 'result' in song and len(song['result']) > 0:
                songID = song['result'][0]['songID']
                review.songID = songID
            insertResult = db.query(
                ("INSERT into rateSong values(%s, %s, %s, %s)"),
                [review.username, review.songID, review.rating, current_date]
            )

            return {
                "reviewID": insertResult['insertId'],
                **review.dict()
            }
        except Exception as e:
            logger.error("Unable to insert song review/rating")
            logger.error(e)
            raise internalServerError.InternalServerError()
