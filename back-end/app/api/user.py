#-*-coding: utf8 -*-
from flask import Flask, jsonify, Blueprint, request, make_response
import time
from app.model.user import User
user_api = Blueprint('user_api', __name__)
import json
from app.helps.somedangerous import get_token, logined_token_required
import time


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
        # test cookie 
        cookies = request.cookies
        print cookies
        response = make_response(jsonify({"status": "200", "error": "1", "message": "学号已经注册过"}))
        response.set_cookie("hey", "hahahahahah")
        return response
        #
        #return  jsonify({"status": "200", "error": "1", "message": "学号已经注册过"})
 
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

@user_api.route('/login', methods=['POST'])
def login():
    data = request.get_data()
    jobj = json.loads(data)
    schoolid = jobj['schoolid']
    password = jobj['password']

    existed_user = User.find_user_by_schoolid(schoolid)
    if not existed_user:
        res = {"error": "1", "message": "用户并不存在",}
        return jsonify(res)
    
    correct = existed_user.password
    if password != correct:
        res = {"error": "1", "message": "账户或密码错误",}
        return jsonify(res)

    token = get_token({"schoolid":existed_user.schoolid})
    User.update_login_token(schoolid=existed_user.schoolid, token=token)
    res = {"error": "0", "token": token, "message": "登录成功"}
    return jsonify(res)


@user_api.route('/logout', methods=['GET'])
@logined_token_required
def logout(user):
    try:
        User.update_login_token(schoolid=user.schoolid, token="")
    except:
        res = {"status": "fail", "error": "1", "message": "服务出错，暂未退出"}
        return jsonify(res)

    res = {"status": "ok", "error": "0", "message": "你已经退出"}
    return jsonify(res)


@user_api.route("/test", methods=['GET', 'POST'])
@logined_token_required
def test_token_required(user):
    return jsonify({"status":"ok", "user": user.schoolid})
        

        