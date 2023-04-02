from pydantic import BaseModel
from errors import internalServerError
import logging as logger
from db.main import Database
import datetime


class InsertSongReview(BaseModel):
    username: str
    songID: str
    reviewText: str


class InsertSongRating(BaseModel):
    username: str
    songID: str
    rating: int


class AccountService():

    def __init__(self, db: Database):
        self.Database = db

    def insertSongReview(self, review: InsertSongReview):
        db = self.Database
        try:
            insertResult = db.query(
                ("INSERT into reviewSong values(%s, %s, %s, %s)"),
                [review.username, review.songID, review.reviewText, datetime.now()]
            )

            return {
                "reviewID": insertResult['insertId'],
                **review.dict()
            }
        except Exception as e:
            logger.error("Unable to insert recipe")
            logger.error(e)
            raise internalServerError.InternalServerError()
