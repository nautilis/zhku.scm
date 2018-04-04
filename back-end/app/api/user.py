#-*-coding: utf8 -*-
from flask import Flask, jsonify, Blueprint, request, make_response
import time
from app.model.user import User
from app.model.admin_club import AdminClub
user_api = Blueprint('user_api', __name__)
import json
from app.helps.somedangerous import get_token, logined_token_required
from app.helps.common import random_str
import time
import os


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

@user_api.route('/info', methods=['GET', 'POST'])
@logined_token_required
def update_base_info(user):
    "update gender, username, campus, bio, email"

    if request.method == "GET":
        print "get method"
        data = {"gender": user.gender, 
        "username": user.username, 
        "campus": user.campus,
         "bio": user.bio, 
         "email": user.email,
         "avatar_path": "http://127.0.0.1:5000/static"  + user.avatar
         }
        res = {"status": "ok", "error": "0", "message": "success", "user": data}
        return jsonify(res)
    else:
        data = request.get_data()
        print "on api " +  data
        jobj = json.loads(data)
        user.gender = jobj['gender']
        user.email = jobj['email']
        user.bio = jobj['bio']
        user.username = jobj['username']
        user.campus = jobj['campus']
        
        try: 
            User.update_base_info(user)
        except:
            res = {"satus": "fail", "error": "1", "message": "服务器错误"}
            return jsonify(res)

        res = {"status": "ok", "error": "0", "message": "用户信息更新成功"}
        print res
        return jsonify(res)

@user_api.route('/avatar', methods=['POST'])
@logined_token_required
def update_avatar(user):
    data = request.get_data()
    file = request.files['avatar']

    avatar_path = user.avatar # 原理的图片位置

    path = os.path.abspath(os.path.dirname(__file__)) + "/../static/uploads/avatar"
    if not os.path.exists(path):
        os.makedirs(path)

    if not avatar_path:
        fielname = random_str(16) + ".jpg"
        location = path + "/" + fielname
    else:
        location = os.path.abspath(os.path.dirname(__file__)) + "/../static" + avatar_path

    print location
    file.save(location)
    store_location = location.split("/static").pop()
    User.update_avatar(user, store_location)

    res = {"status": "ok", "error": "0", "message": "图片上传成功"}
    return jsonify(res)

@user_api.route('/clubs', methods=['GET'])
@logined_token_required
def get_user_club_info(user):
    clubs = User.get_all_clubs(user)
    res = {}
    res["user"] = user.to_dict()
    res["clubs"] = []
    for ind, club in enumerate(clubs):
        c_dict = club.to_dict()
        if AdminClub.is_admin(user.uid, club.cid):
            c_dict['is_admin'] = '1'
        else:
            c_dict['is_admin'] = '0'
        res['clubs'].append(c_dict)

    res['status'] = 'ok'
    res['message'] = ''
    res['error'] = 0

    return jsonify(res)        
        

        