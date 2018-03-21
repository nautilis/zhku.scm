#-*-coding: utf8 -*-
from flask import request, jsonify, Blueprint
from app.model.club import Club
club_api = Blueprint('club_api', __name__)
import json
from app.helps.somedangerous import get_token, logined_token_required
from app.helps.common import random_str


@club_api.route("/index", methods=["GET"])
def get_all_clubs():
    res = []
    clubs = Club.get_all_clubs()
    for i in clubs:
        res.append(i.to_dict())
    return jsonify(res)

@club_api.route("/<int:cid>", methods=["POST", "GET"])
@logined_token_required
def edit_club_info(cid, user):
    #TODO 用户是否为管理员验证
    #TODO 不存在cid放回404
    data = request.get_data()
    jobj = json.loads(data)
    clubname = jobj['clubname']
    chariman = jobj['chairman']

    club = Club.find_club_by_id(cid)
    club.name = clubname
    club.chairman = chariman

    Club.update_club_info(clubid=cid, club=club)

    res = {"status": "ok", "error":"0", "message": "更新成功"}
    return jsonify(res)

    

