from pydantic import BaseModel
from errors import internalServerError
import logging as logger
from db.main import Database
from datetime import datetime
from typing import Optional
from errors import internalServerError, userNotFound, main as Errors, invalidToken


class playlist(BaseModel):
    playlistName: str
    username: str
    title: Optional[str] = None
    description: Optional[str] = None


class PlaylistService():

    def __init__(self, db: Database):
        self.Database = db

    # get all playlists of a user
    def getAllPlaylists(self, username: str) -> list[str]:
        db = self.Database
        try:
            playlists = db.query(
                ("SELECT playlistName FROM playlist WHERE username = %s"), [username])

            # return a list of the playlist names
            return [r['playlistName'] for r in playlists['result']]

        except Exception as e:
            logger.error("Unable to get all playlists")
            logger.error(e)
            raise internalServerError.InternalServerError()

    # get all songs in a playlist
    def getAllSongs(self, querydata: playlist) -> list[str]:
        db = self.Database
        try:
            songs = db.query(
                ("SELECT title FROM songInPlaylist NATURAL JOIN song WHERE playlistName = %s AND username = %s"), [querydata.playlistName, querydata.username])

            # return a list of the songIDs
            return [r['title'] for r in songs['result']]

        except Exception as e:
            logger.error("Unable to get songs in playlist")
            logger.error(e)
            raise internalServerError.InternalServerError()

    # create a playlist
    def createPlaylist(self, querydata: playlist):
        db = self.Database
        try:
            # check if playlist exists
            if db.query(("SELECT * FROM playlist WHERE playlistName = %s AND username = %s"), [querydata.playlistName, querydata.username])['result']:
                logger.error("Duplicate playlist")
                raise Errors.playlistExists

            # create playlist
            db.query(("INSERT INTO playlist VALUES (%s, %s, %s, %s)"), [
                     querydata.playlistName, querydata.username, datetime.now().strftime('%Y-%m-%d %H:%M:%S'), querydata.description])

        except Exception as e:
            logger.error("Unable to create playlist")
            logger.error(e)
            raise internalServerError.InternalServerError()

    # add a song to a playlist
    def addSong(self, querydata: playlist):
        db = self.Database
        try:
            # fetch songID
            songID = db.query(("SELECT songID FROM song WHERE title = %s"), [
                querydata.title])['result']
            if not songID:
                raise Errors.songNotFound
            songID = songID[0]['songID']

            # add song to playlist
            db.query(("INSERT INTO songInPlaylist VALUES (%s, %s, %s)"), [
                     querydata.username, querydata.playlistName, songID])

        except Exception as e:
            logger.error("Unable to add song to playlist")
            logger.error(e)
            raise internalServerError.InternalServerError()

    # delete a playlist

    def deletePlaylist(self, querydata: playlist):
        db = self.Database
        try:
            # check if playlist exists
            if not db.query(("SELECT * FROM playlist WHERE playlistName = %s AND username = %s"), [querydata.playlistName, querydata.username])['result']:
                raise Errors.playlistNotFound

            # delete playlist
            db.query(("DELETE FROM playlist WHERE playlistName = AND username = %s"), [
                     querydata.playlistName, querydata.username])

        except Exception as e:
            logger.error("Unable to delete playlist")
            logger.error(e)
            raise internalServerError.InternalServerError()
