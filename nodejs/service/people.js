const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');

// Function to search for people
const getPeopleResults = async (firstName, lastName, email) => {
  try {

    const filters = []

    if (firstName){
      filters.push(`users.fname LIKE "%${firstName}%"`)
    }
    if (lastName){
      filters.push(`users.lname LIKE "%${lastName}%"`)
    }
    if (email) {
      filters.push(`users.email LIKE "%${email}%"`)
    }

    const filtersQueryString = filters.join(' AND ')

    console.log('SELECT * FROM users WHERE ' + filtersQueryString)

   const peopleResults = await db.getDBObject().query('SELECT * FROM users WHERE '
        + filtersQueryString)

   console.log(peopleResults)

   return peopleResults;

  } catch (e) {
    console.error(e)
    console.error('unable to find person')
    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    throw e;
  }
}

module.exports = {
  getPeopleResults
}