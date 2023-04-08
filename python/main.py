from fastapi import FastAPI, Request, Query
import uvicorn
import os
from fastapi.responses import JSONResponse
from db.main import Database
from dotenv import load_dotenv
import service.authService as authService
import service.accountService as accountService
import service.queryService as queryService
import service.friendReqService as friendReqService
from errors.main import ExtendableError
from errors.internalServerError import InternalServerError
from errors.invalidToken import InvalidJwtError
from errors.userNotFound import UserNotFound
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

db = Database()

AuthService = authService.AuthService(db)
AccountService = accountService.AccountService(db)
QueryService = queryService.QueryService(db)
FriendReqService = friendReqService.FriendReqService(db)
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/signup")
async def signupHandler(registrationData: authService.UserRegistration):
    try:
        user = AuthService.registerUser(registrationData)
        return user
    except Exception as e:
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e


@app.post("/login")
async def loginHandler(loginData: authService.LoginForm):
    try:
        user = AuthService.login(loginData)
        return user
    except Exception as e:
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e

# pass search term in req body, e.g.,
# {
#   "query": "Jazz",
#   "rating": "1"
# }


@app.post("/querysongs")
async def songQueryHandler(queryData: queryService.Query):
    try:
        results = QueryService.generalQuery(queryData)
        return results
    except Exception as e:
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e

# attach username as query string, for example http://localhost:3000/newitems?username=Yuzu66 to get all new items for user Yuzu66


@app.get("/newitems")
async def newItemsHandler(username: str = Query(...)):
    try:
        results = QueryService.newItems(username)
        return results
    except Exception as e:
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e


# http://localhost:3000/getfriends?username=Yuzu66 to get all friend requests for user Yuzu66
@app.get("/getfriends")
async def getFriends(username: str = Query(...)):
    try:
        results = FriendReqService.getAllRequests(username)
        return results
    except Exception as e:
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e


@app.post("/managereqs")
async def manageFriendsReqs(queryData: friendReqService.friendReq):
    try:
        results = FriendReqService.manageFriendRequests(queryData)
        return results
    except Exception as e:
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e


@app.post("/sendreq")
async def sendFriendReq(queryData: friendReqService.friendReq):
    try:
        results = FriendReqService.issueFriendRequest(queryData)
        return results
    except Exception as e:
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e


@app.middleware("http")
async def AuthMiddleWare(request: Request, call_next):
    try:
        # added additional routes for testing purposes
        if (request.url.path not in ['/signup', '/login', '/sendreq', '/querysongs', '/newitems', '/reviewsong', '/ratesong', '/getfriends', '/managereqs']):
            authHeader = request.headers.get('authorization')
            if authHeader is None:
                raise InvalidJwtError()
            tokenizedHeader = authHeader.split(' ')
            if len(tokenizedHeader) != 2:
                raise InvalidJwtError()
            token = tokenizedHeader[1]
            user = AuthService.getUserFromToken(token)
            request.state.user = user
        response = await call_next(request)
        return response
    except Exception as e:
        if not isinstance(e, ExtendableError):
            ex = InternalServerError()
            return JSONResponse(
                status_code=int(ex.code),
                content={'info': ex.info, 'code': int(
                    ex.code), 'name': ex.name}
            )
        return JSONResponse(
            status_code=int(e.code),
            content={'info': e.info, 'code': int(e.code), 'name': e.name}
        )


@app.get("/")
async def getUser(request: Request):
    try:
        if (request.state.user == None):
            raise UserNotFound()
        return request.state.user
    except Exception as e:
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e


@app.post("/reviewsong")  # post a new song review
async def postSongReview(request: Request, songToAdd: accountService.InsertSongReview):
    try:
        # reads the request body and returns a dictionary with the parsed JSON data
        data = await request.json()
        songToAdd.username = data["username"]
        if ("songID" in data):
            songToAdd.songID = data["songID"]
        songToAdd.songTitle = data["songTitle"]
        songToAdd.reviewText = data["reviewText"]
        print(songToAdd)
        postedSong = AccountService.insertSongReview(songToAdd)
        return postedSong
    except Exception as e:
        print(e)
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e


@app.post("/ratesong")  # post a new song rating
async def postSongRating(request: Request, songToAdd: accountService.InsertSongRating):
    try:
        data = await request.json()
        songToAdd.username = data["username"]
        if ("songID" in data):
            songToAdd.songID = data["songID"]
        songToAdd.songTitle = data["songTitle"]
        songToAdd.rating = data["rating"]
        postedSong = AccountService.insertSongRating(songToAdd)
        return postedSong
    except Exception as e:
        print(e)
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e


@app.exception_handler(ExtendableError)
async def exceptionHandler(request: Request, exc: ExtendableError):
    return JSONResponse(
        status_code=int(exc.code),
        content={'info': exc.info, 'code': int(exc.code), 'name': exc.name}
    )


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3000)
