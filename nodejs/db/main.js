const mysql = require('mysql');
const util = require('util');

let query;
let poolInitialized = false;

// add table names that match with mysql table names and export it at module.exports
const UserTable = 'users';
const RecipeTable = 'Recipe';

const initDBConnection = () => {
  const poolWithoutPromise = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER_ID,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
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
  RecipeTable,
};
