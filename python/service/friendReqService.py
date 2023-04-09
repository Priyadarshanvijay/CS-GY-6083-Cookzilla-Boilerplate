from pydantic import BaseModel
from errors import internalServerError
import logging as logger
from db.main import Database
from datetime import datetime
from typing import Optional
from errors import internalServerError, userNotFound, main as Errors, invalidToken


class friendReq(BaseModel):
    usr_from: str
    usr_to: Optional[str] = None
    operation: Optional[str] = None


class FriendReqService():

    def __init__(self, db: Database):
        self.Database = db

    # get all friends of usr_from
    def getAllRFriends(self, querydata: str) -> list[str]:
        db = self.Database
        try:
            requests = db.query(
                ("SELECT user1, user2 FROM friend WHERE ((user2 = %s OR user1 = %s) AND acceptStatus = 'Accepted')"), [querydata, querydata])

            # return a list of the usernames
            return [r['user1'] if r['user1'] != querydata else r['user2'] for r in requests['result']]

        except Exception as e:
            logger.error("Unable to get all friend requests")
            logger.error(e)
            raise internalServerError.InternalServerError()

    # get all pending friend requests for user_from
    def getAllRequests(self, querydata: str) -> list[str]:
        db = self.Database
        try:
            # get all pending requests
            requests = db.query(
                ("SELECT * FROM friend WHERE ((user2 = %s OR user1 = %s) AND acceptStatus = 'Pending' AND requestSentBy != %s)"), [querydata, querydata, querydata])

            # return a list of the usernames that sent friend requests to the user
            return [((r['user1'], r['createdAt']) if r['user1'] != querydata else (r['user2'], r['createdAt'])) for r in requests['result']]

        except Exception as e:
            logger.error("Unable to get all friend requests")
            logger.error(e)
            raise internalServerError.InternalServerError()

    # usr_to is the current user, usr_from is the user to be accepted/rejected
    def manageFriendRequests(self, querydata: friendReq):
        db = self.Database
        try:
            # check if operation is valid
            if querydata.operation not in ['reject', 'accept']:
                raise ValueError("Invalid operation")

            # check if friend request exists
            pending_request = db.query(
                "SELECT * FROM friend WHERE (acceptStatus = 'Pending' AND requestSentBy = %s AND (user1 = %s OR user2 = %s))", [querydata.usr_from, querydata.usr_to, querydata.usr_to])
            if (len(pending_request['result']) == 0):
                return {"message": "No pending friend request found"}

            # reject friend request
            if querydata.operation == 'reject':
                db.query(
                    "UPDATE friend SET acceptStatus = 'Rejected', updatedAt = %s WHERE ((user1 = %s AND user2 = %s) OR (user2 = %s AND user1 = %s))",
                    [datetime.now().strftime('%Y-%m-%d %H:%M:%S'), querydata.usr_from,
                     querydata.usr_to, querydata.usr_to, querydata.usr_from]
                )
                return querydata.usr_from

            # accept friend request
            elif querydata.operation == 'accept':
                db.query(
                    "UPDATE friend SET acceptStatus = 'Accepted', updatedAt = %s WHERE ((user1 = %s AND user2 = %s) OR (user2 = %s AND user1 = %s))",
                    [datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                     querydata.usr_from, querydata.usr_to, querydata.usr_to, querydata.usr_from]
                )
                return querydata.usr_from

        except Exception as e:
            logger.error("Unable to accept/reject friend request")
            logger.error(e)
            raise internalServerError.InternalServerError()

    # usr_from issue a friend request to usr_to
    def issueFriendRequest(self, querydata: friendReq):
        db = self.Database
        try:
            # check if user exists
            queryRes = db.query(
                "SELECT * FROM user WHERE username = %s", [querydata.usr_to])
            if (len(queryRes['result']) == 0):
                raise userNotFound.UserNotFound()

            # check if friend request already exists
            pending_request = db.query(
                ("SELECT * FROM friend WHERE ((user1 = %s AND user2 = %s) OR (user2 = %s AND user1 = %s))"), [querydata.usr_to, querydata.usr_from, querydata.usr_from, querydata.usr_to])
            if (len(pending_request['result']) != 0):
                return {"message": "Friend request already exists"}
            else:
                # send a friend request to the specified user
                if (querydata.usr_from < querydata.usr_to):
                    db.query(
                        ("INSERT into friend values(%s, %s, %s, %s, %s, %s)"),
                        [querydata.usr_from, querydata.usr_to, 'Pending',  querydata.usr_from, datetime.now().strftime(
                            '%Y-%m-%d %H:%M:%S'), datetime.now().strftime('%Y-%m-%d %H:%M:%S')]
                    )
                else:
                    db.query(
                        ("INSERT into friend values(%s, %s, %s, %s, %s, %s)"),
                        [querydata.usr_to, querydata.usr_from, 'Pending',  querydata.usr_from, datetime.now().strftime(
                            '%Y-%m-%d %H:%M:%S'), datetime.now().strftime('%Y-%m-%d %H:%M:%S')]
                    )
                return {"message": "Friend request sent!"}

        except Exception as e:
            logger.error("Unable to issue friend request")
            logger.error(e)
            raise internalServerError.InternalServerError()
