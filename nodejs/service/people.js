const db = require('../db/main');

const getPeopleResults = async (firstName, lastName, email) => {
  try {
    const filters = []

    if (firstName){
      filters.push(`users.fname = "${firstName}"`)
    }
    if (lastName){
      filters.push(`users.lname = "${lastName}"`)
    }
    if (email) {
      filters.push(`users.email = "${email}"`)
    }

    
    const filtersQueryString = filters.join(' AND ')

    console.log('SELECT * FROM users WHERE '
    + filtersQueryString)
    const peopleResults = await db.getDBObject().query('SELECT * FROM users WHERE'
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