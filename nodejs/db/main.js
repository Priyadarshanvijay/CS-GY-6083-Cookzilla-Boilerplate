const mysql = require('mysql');
const util = require('util');

let query;
let poolInitialized = false;

// table name constants that match table names in mysql
const UserTable = 'users';
const SongTable = 'song';
const ArtistTable = 'artist';
const AlbumTable = 'album';
const FollowsTable = 'follows';
const FriendTable = 'friend';
const ArtistPerformsSongTable = 'artistPerformsSong';
const RateAlbumTable = 'rateAlbum';
const ReviewAlbumTable = 'reviewAlbum';
const RateSongTable = 'rateSong';
const ReviewSongTable = 'reviewSong';
const UserFanOfArtistTable = 'userFanOfArtist';
const SongGenreTable = 'songGenre';
const SongInAlbumTable = 'songInAlbum';

const initDBConnection = () => {
  const poolWithoutPromise = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER_ID,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });
  query = util.promisify(poolWithoutPromise.query).bind(poolWithoutPromise);
  poolInitialized = true;
};

const getDBObject = () => {
  if (!poolInitialized) {
    throw Error('DB connection not established yet');
  }
  return {
    query,
  };
};

module.exports = {
  initDBConnection,
  getDBObject,
  UserTable,
  AlbumTable,
  SongTable,
  ArtistTable,
  ArtistPerformsSongTable,
  FriendTable,
  FollowsTable,
  ReviewAlbumTable,
  ReviewSongTable,
  RateAlbumTable,
  RateSongTable,
  UserFanOfArtistTable,
  SongGenreTable,
  SongInAlbumTable,
};