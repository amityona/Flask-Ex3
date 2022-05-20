import requests
from flask import Flask
from flask_redis import FlaskRedis
from flask import jsonify
import Models.newsModel
import Models.commentstodb
from flask_restful import reqparse
from flask import request
from flask_cors import CORS
from bson.json_util import dumps
import json
app = Flask(__name__)
CORS(app)

#Combine news between two sources
@app.route('/', methods=['GET'])

def getCombineNews():
    response = Models.newsModel.CombineNews()
    return jsonify(response)



@app.route('/news', methods=['GET'])
def getNews():
    url = ('https://newsapi.org/v2/everything?'
           'q=Apple&'
           'from=2022-05-10&'
           'sortBy=popularity&'
           'apiKey=05045234115f487186bb978cef434beb')
    response = requests.get(url).json()
    arrayResponse = response['articles']
    list_cur = list(arrayResponse)
    json_data = dumps(list_cur)
    convertedDict = json.loads(json_data)
    return jsonify(convertedDict)


@app.route('/mynews', methods=['POST','GET'])
def addNews():
    if request.method == 'POST':
        parser = reqparse.RequestParser()
        parser.add_argument('author', help='Type in some text')
        parser.add_argument('title', help='Type in some text')
        parser.add_argument('discrption', help='Type in some text')
        parser.add_argument('urlToImage', help='Type in some text')
        parser.add_argument('url', help='Type in some text')
        args = parser.parse_args()
        responseDB= Models.newsModel.addNewsToDB(args);
        return  responseDB
    if request.method == 'GET':
        answer = Models.newsModel.getMyNews()
        return jsonify(answer)

#Search by name of author
@app.route('/mynews/<author>', methods=['GET'])
def getMyNewsHTTPByAthor(author):
    answer = Models.newsModel.getMyNewsByAuthoer(author)
    return jsonify(answer)


## *********************** Comments *************************
@app.route('/comments', methods=['POST','GET'])
def addComments():
    if request.method == 'POST':
        parser = reqparse.RequestParser()
        parser.add_argument('id', help='Type in some text')
        parser.add_argument('comment', help='Type in some text')
        parser.add_argument('name', help='Type in some text')
        args = parser.parse_args()
        responseDB= Models.commentstodb.addCommentstoDB(args);
        return  responseDB
    if request.method == 'GET':
        answer = Models.commentstodb.getMyComments()
        return jsonify(answer)



@app.route('/comments/<id>', methods=['GET'])
def getCommentsByID(id):
    answer = Models.commentstodb.getMyCommentsByID(id)
    return jsonify(answer)




if __name__ == '__main__':
    print("start")
    app.run(debug=True)