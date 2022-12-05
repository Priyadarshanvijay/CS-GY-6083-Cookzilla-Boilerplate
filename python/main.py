from fastapi import FastAPI, Request
import uvicorn
import os
from fastapi.responses import JSONResponse
from db.main import Database
from dotenv import load_dotenv
import service.authService as authService
import service.recipeService as recipeService
from errors.main import ExtendableError
from errors.internalServerError import InternalServerError
from errors.invalidToken import InvalidJwtError
from errors.userNotFound import UserNotFound


load_dotenv()

app = FastAPI()

db = Database()

AuthService = authService.AuthService(db)
RecipeService = recipeService.RecipeService(db)


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

@app.middleware("http")
async def AuthMiddleWare(request: Request, call_next):
    try:
        if(request.url.path not in ['/signup', '/login']):
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
                content={'info': ex.info, 'code': int(ex.code), 'name': ex.name}
            )
        return JSONResponse(
            status_code=int(e.code),
            content={'info': e.info, 'code': int(e.code), 'name': e.name}
        )
        
@app.get("/user")
async def getUser(request: Request):
    try:
        if(request.state.user == None):
            raise UserNotFound()
        return request.state.user
    except Exception as e:
        if not isinstance(e, ExtendableError):
            raise InternalServerError()
        raise e

@app.post("/recipe")
async def postRecipe(request: Request, recipeToAdd: recipeService.InsertRecipe):
    try:
        postedBy = request.state.user['userName']
        recipeToAdd.postedBy = postedBy
        postedRecipe = RecipeService.insertRecipe(recipeToAdd)
        return postedRecipe
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
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ['PORT']))