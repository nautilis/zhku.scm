from flask import Flask, jsonify, Blueprint, request
from app.model.user import User
user_api = Blueprint('user_api', __name__)

@user_api.route('/hello', methods=['GET'])
def hello_world():
    user = User("test")
    print user
    return jsonify({'say':'hello world'})

# @user_api.route('/', methods=['POST'])
# def create():
#     username = request.form['username']
#     schoolid = request.form['id']
#     password = request.form['password']

#     print (username, schoolid, password)
