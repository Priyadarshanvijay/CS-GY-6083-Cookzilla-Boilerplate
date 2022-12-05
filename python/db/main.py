import mysql.connector
import logging as logger
import os
import traceback

class Database:
  __instance : mysql.connector.MySQLConnection = None

  PersonTable = "Person"
  RecipeTable = "Recipe"

  def __init__(self):
      if self.__instance is None or self.__instance.is_connected() == False:
        self.__instance = mysql.connector.connect(
                host=os.environ['DB_HOST'],
                user=os.environ['DB_USER_ID'],
                password=os.environ['DB_USER_PASSWORD'],
                database=os.environ['DB_NAME']
            )
  
  def query(self, queryString="", params=()):
    try:
      cursor = self.__instance.cursor()
      cursor.execute(queryString, params)
      rows = cursor.fetchall()
      operation = cursor.lastrowid
      description = cursor.description
      fields = []
      if description is not None:
        fields = [field_md[0] for field_md in cursor.description]
      cursor.close()
      result = [dict(zip(fields, row)) for row in rows]
      return { "result": result, "insertId": None if operation is 0 else operation }
    except Exception as e:
      logger.error("Error in DB Query: %s\n %s", e, traceback.format_exception(e))
      raise e
    finally:
      self.__instance.commit()
