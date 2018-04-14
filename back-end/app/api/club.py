#-*-coding: utf8 -*-
from flask import request, jsonify, Blueprint
from app.model.club import Club
club_api = Blueprint('club_api', __name__)
import json
from app.helps.somedangerous import get_token, logined_token_required
from app.helps.common import random_str
import os


@club_api.route("/index", methods=["GET"])
def get_all_clubs():
    res = []
    clubs = Club.get_all_clubs()
    for i in clubs:
        res.append(i.to_dict())
    return jsonify(res)

@club_api.route("/<int:cid>", methods=["POST"])
@logined_token_required
def edit_club_info(cid, user):
    #TODO 用户是否为管理员验证
    #TODO 不存在cid放回404
    data = request.get_data()
    jobj = json.loads(data)
    clubname = jobj['clubname']
    chairman = jobj['chairman']
    desc = jobj['desc']
    address = jobj['address']

    club = Club.find_club_by_id(cid)
    club.name = clubname
    club.chairman = chairman
    club.desc = desc
    club.address = address

    Club.update_club_info(clubid=cid, club=club)

    res = {"status": "ok", "error":"0", "message": "更新成功"}
    return jsonify(res)

@club_api.route("/picture/<int:cid>", methods=["POST"])
@logined_token_required
def update_club_picture(cid, user):
    data = request.get_data()
    file = request.files['avatar']
    club = Club.find_club_by_id(cid)
    
    avatar_path = club.avatar # 原理的图片位置

    path = os.path.abspath(os.path.dirname(__file__)) + "/../static/uploads/club_pictures"
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
    Club.update_avatar(cid, store_location)
    
    return jsonify({"error": "0", "status": "ok", "message": "updated"})

@club_api.route("/<int:cid>", methods=["GET"])
def get_club_info(cid):
    res = {}
    club = Club.find_club_by_id(cid)
    res["club"] = club.to_dict()
    res["error"] = "0"
    res["message"] = ""
    res["status"] = "ok"
    return jsonify(res)

    

