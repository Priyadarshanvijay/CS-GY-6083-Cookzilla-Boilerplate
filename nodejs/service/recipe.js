const db = require('../db/main');
const InternalServerError = require('../errors/internalServerError');

const insertRecipe = async (title, numServings, postedBy) => {
  try {
    const insertResult = await db.getDBObject()
    .query(
      "INSERT into ?? (title, numServings, postedBy) values(?, ?, ?)",
      [db.RecipeTable, title, numServings, postedBy]
    )
    return {
      recipeID: insertResult.insertId,
      title,
      numServings,
      postedBy
    };
  } catch (e) {
    console.error("unable to insert recipe");
    console.error(e);
    throw new InternalServerError();
  }
};

module.exports = {
  insertRecipe
};