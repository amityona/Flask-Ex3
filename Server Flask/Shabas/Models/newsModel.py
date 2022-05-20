import pymongo
import numpy as np
from bson.json_util import dumps
from datetime import datetime
import json
import requests

mongoClient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = mongoClient["news-Database"]
mycol = mydb["news"]

def addNewsToDB(news):
    mydict = {
        "author": news.author,
        "title": news.title,
        "discrption": news.discrption,
        "publishedAt":datetime.now().strftime("%m/%d/%Y"),
        "urlToImage":news.urlToImage,
        "url":news.url
              }
    try:
        asnwerDB = mycol.insert_one(mydict)
        return  {"status":"Add to DB "}
    except NameError:
        return NameError

#return by time created sorted
def getMyNews():
    data = mycol.find({}).sort("publishedAt",-1)
    list_cur = list(data)
    json_data = dumps(list_cur)
    convertedDict = json.loads(json_data)
    return convertedDict

#Can use with getMyNews ....
def getMyNewsByAuthoer(author):
    data = mycol.find({"author":author}).sort("publishedAt",-1)
    list_cur = list(data)
    json_data = dumps(list_cur)
    convertedDict = json.loads(json_data)
    return convertedDict

def CombineNews():
    url = ('https://newsapi.org/v2/everything?'
           'q=Apple&'
           'from=2022-05-10&'
           'sortBy=popularity&'
           'apiKey=05045234115f487186bb978cef434beb')
    response = requests.get(url).json()
    arrayResponse = response['articles'][0:5]
    arrayTwo = getMyNews()[0:5] #reuseable
    resp = np.concatenate((arrayResponse, arrayTwo))
    print(resp)
    list_cur = list(resp)
    json_data = dumps(list_cur)
    convertedDict = json.loads(json_data)
    return convertedDict