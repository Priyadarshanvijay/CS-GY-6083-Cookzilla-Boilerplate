const express = require("express");
const cors = require("cors");
const db = require("./db/main")
const AuthService = require('./service/auth');
const AuthMiddleWare = require('./middleware/auth');
const RecipeService = require('./service/recipe');
const RatingService = require('./service/rating'); // Added by Nigel
const SearchService = require('./service/search')
const errorHandler = require("./middleware/errorHandler");
const morgan = require('morgan');

require("dotenv").config();

const app = express();

app.use(morgan('common'));


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res, next) => {
  try {
    const {
      userName, password, firstName, lastName, email, profile
    } = req.body;
    const user = await AuthService.registerUser(userName, password, firstName, lastName, email, profile);
    res.json(user)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

app.post('/login', async (req, res, next) => {
  try {
    const {
      userName, password
    } = req.body;
    const user = await AuthService.login(userName, password);
    res.json(user)
  } catch (e) {
    console.error(e);
    next(e);
  }
})

app.get('/search', async(req,res,next)=>{
  try {
    const {song, artist, album, genre, songRating} = req.query
    const searchResults = await SearchService.getSearchResults(song,artist,album,genre,songRating)
    res.json(searchResults)
  } catch (error) {
    console.error(e);
    next(e);
  }
})

// Added by Nigel
// Needs to be modified to post a rating

app.post('/rating', async (req, res, next) => {
  try {
    const {
      songRating,
      user,
      songID
    } = req.body;
    const postedRating = await RatingService.insertRating(user, songID, songRating);
    res.json(postedRating);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

// all routes defined after this middleware requires auth token
app.use(AuthMiddleWare.loginAuth);

app.get('/user', async (req,res, next) => {
  try {
    if(!req.user) {
      throw new USER_NOT_FOUND();
    }
    res.json(req.user);
  } catch (e) {
    console.error(e);
    next(e);
  }
})

app.post('/recipe', async (req, res, next) => {
  try {
    const {
      title, numServings
    } = req.body;
    const postedBy = req.user.userName;
    const postedRecipe = await RecipeService.insertRecipe(title, numServings, postedBy);
    res.json(postedRecipe);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  db.initDBConnection()
  console.log(`Server is running on port ${PORT}.`);
});