const db = require('../db/main');
const jwt = require('jsonwebtoken');
const crypto = require('bcryptjs');
const JWTError = require('../errors/invalidToken');
const DuplicateUser = require('../errors/duplicateUser');
const UserNotFound = require('../errors/userNotFound');
const IncorrectPassword = require('../errors/incorrectPassword');
const { ExtendableError } = require('../errors/main');
const InternalServerError = require('../errors/internalServerError');

const login = async (userName, password) => {
  try {
    //fetch user data from db based on username
    const userRows = await db
      .getDBObject()
      .query('SELECT username, pwd FROM ?? where username = ?', [
        db.user,
        userName,
      ]);
    if (userRows.length != 1) {
      throw new UserNotFound();
    }
    const user = userRows[0];
    //check if pwd matches
    const passwordMatches = await crypto.compare(password, user.pwd);
    if (!passwordMatches) {
      throw new IncorrectPassword();
    }
    return {
      ...userRows[0],
      token: generateToken(user.userName),
      password: undefined,
    };
  } catch (e) {
    console.error('unable to login');
    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    throw e;
  }
};

const getUserFromToken = async (token) => {
  try {
    const verifiedData = jwt.verify(token, process.env.JWT_SECRET);
    return getUser(verifiedData.sub);
  } catch (e) {
    console.error('invalid token');
    console.error(e);
    throw new JWTError();
  }
};

const getUser = async (userName) => {
  try {
    const userRows = await db
      .getDBObject()
      .query('SELECT username, fname, lname FROM ?? where username = ?', [
        db.user,
        userName,
      ]);
    if (userRows.length != 1) {
      throw new Error('User not found');
    }
    const user = userRows[0];
    return {
      user,
    };
  } catch (e) {
    console.error('unable to find user');
    console.error(e);
    throw new UserNotFound();
  }
};

const registerUser = async (
  userName,
  password,
  firstName,
  lastName,
  email,
  profile
) => {
  try {
    const hashedPassword = await crypto.hash(password, 8);
    const res = await db
      .getDBObject()
      .query(
        'INSERT into ?? (userName, password, fName, lName, email, profile) values (?,?,?,?,?,?)',
        [
          db.PersonTable,
          userName,
          hashedPassword,
          firstName,
          lastName,
          email,
          profile,
        ]
      );
    return {
      ...res,
      token: generateToken(userName),
    };
  } catch (e) {
    console.error('Unable to register user');
    console.error(e.code, e.sqlMessage, e.errno);
    if (e.code && e.code === 'ER_DUP_ENTRY') {
      throw new DuplicateUser();
    }
    throw new InternalServerError();
  }
};

const JWTConfig = {
  issuer: 'cookzilla',
  audience: 'cookzilla',
  expiresIn: '2d',
};

const generateToken = (userName) =>
  jwt.sign({ sub: userName }, process.env.JWT_SECRET, JWTConfig);

module.exports = {
  login,
  registerUser,
  getUserFromToken,
};
