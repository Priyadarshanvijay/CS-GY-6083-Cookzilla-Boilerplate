const db = require('../db/main');
const jwt = require('jsonwebtoken');

const getSongs = async () => {
  try {
    const songRows = await db.getDBObject().query('SELECT * from ??',
    [db.SongTable])
    if(songRows.length < 1){
      // throw no songs error
    }
    return songRows;
  } catch (e) {
    console.error('unable to get songs')
    if (!(e instanceof ExtendableError)) {
      console.error(e);
      throw new InternalServerError();
    }
    throw e;
  }
}


module.exports = {
  getSongs
}
