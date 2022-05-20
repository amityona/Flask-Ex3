import pymongo
from bson.json_util import dumps
from datetime import datetime
import json

mongoClient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = mongoClient["news-Database"]
mycol = mydb["comments"]

def addCommentstoDB(comment):
    mydict = {
        "id": comment.id,
        "comment": comment.comment,
        "publishedAt": datetime.now().strftime("%m/%d/%Y, %H:%M:%S"),
        "name": comment.name,
              }
    try:
        asnwerDB = mycol.insert_one(mydict)
        return  {"status":"Comment add to DB "}
    except NameError:
        return NameError



def getMyComments():
    data = mycol.find().sort("publishedAt",-1)
    list_cur = list(data)
    json_data = dumps(list_cur)
    convertedDict = json.loads(json_data)
    return convertedDict


def getMyCommentsByID(id):
    data = mycol.find({"id":id}).sort("publishedAt",-1)
    list_cur = list(data)
    json_data = dumps(list_cur)
    convertedDict = json.loads(json_data)
    return convertedDict