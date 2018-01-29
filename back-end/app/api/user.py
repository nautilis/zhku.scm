#-*-coding: utf8 -*-
from flask import Flask, jsonify, Blueprint, request, make_response
import time
from app.model.user import User
user_api = Blueprint('user_api', __name__)
import json

@user_api.route('/hello', methods=['GET'])
def hello_world():
    user = User("test")
    print user
    return jsonify({'say':'hello world'})

@user_api.route('/', methods=['POST'])
def create():
    data = request.get_data()
    print data
    jobj = json.loads(data)
    schoolid = jobj['schoolid']
    password = jobj['password']
 
    print (schoolid, password)
    existed_user = User.find_user_by_schoolid(schoolid)
    if existed_user:
        return  jsonify({"status": "200", "error": "1", "message": "学号已经注册过"})
 
    else:
        user = User()
        user.schoolid = schoolid
        user.password = password
        localtime = time.localtime(time.time())
        year = time.strftime("%Y", localtime)
        user.sessionno = year
        result = User.create_user(user)
        if result == 1:
            return jsonify({"status": "200", "error":"0", "message":"注册成功，现在可以登录了",})
        else:
            return jsonify({"status": "200", "error": "1", "message": "未知错误",})