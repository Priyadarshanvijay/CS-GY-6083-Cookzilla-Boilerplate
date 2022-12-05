from pydantic import BaseModel
from errors import internalServerError
import logging as logger
from db.main import Database

class InsertRecipe(BaseModel):
    title: str
    numServings: int
    postedBy: str = ""

class RecipeService():

  def __init__(self, db: Database):
    self.Database = db

  def insertRecipe(self, recipe: InsertRecipe):
    db = self.Database
    try:
      insertResult = db.query(
        ("INSERT into "+ db.RecipeTable +" (title, numServings, postedBy) values(%s, %s, %s)"),
        [recipe.title, recipe.numServings, recipe.postedBy]
      )

      return {
        "recipeID": insertResult['insertId'],
        **recipe.dict()
      }
    except Exception as e:
      logger.error("Unable to insert recipe")
      logger.error(e)
      raise internalServerError.InternalServerError()