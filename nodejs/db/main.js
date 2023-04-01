const mysql = require('mysql');
const util = require('util');

let query;
let poolInitialized = false;

//? what are these, why are we exporting them?
const PersonTable = 'user';
const RecipeTable = 'Recipe';

// initiate a new connect to DB
const initDBConnection = () => {
  const poolWithoutPromise = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER_ID,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
    // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
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
  PersonTable,
  RecipeTable,
};
