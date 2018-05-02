#-*-coding: utf8 -*-
from flask import Flask, jsonify, Blueprint, request, make_response
import time
apply_api= Blueprint('apply_api', __name__)
import json
from app.helps.somedangerous import get_token, logined_token_required
from app.helps.common import random_str
import time
import os
from app.model.apply import Apply 
from app.model.club import Club
from app.model.user_club import UserClub
from app.model.user import User
import pdb

@apply_api.route("/", methods=["POST"])
@logined_token_required
def create_apply(user):
    data = request.get_data()
    #print data
    jobj = json.loads(data)

    apply = Apply()
    apply.userid = user.uid 
    apply.employmentid = jobj["employmentid"] 
    apply.activityid = jobj["activityid"]
    apply.applytype = jobj["applytype"]
    apply.name = jobj["name"]
    apply.phone = jobj["phone"]
    apply.filepath = jobj["filepath"]
    apply.clubid = jobj["clubid"]

    Apply.create(apply)
    res = {"status": "ok", "message": "报名成功", "error": "0"}
    return jsonify(res)

@apply_api.route("/upload_file", methods=["POST"])
@logined_token_required
def upload_file(user):
    data = request.get_data()
    # print data
    file = request.files['file']

    path = os.path.abspath(os.path.dirname(__file__)) + "/../static/uploads/apply_file"
    if not os.path.exists(path):
        os.makedirs(path)

    fielname = random_str(16) + ".doc"
    location = path + "/" + fielname
    file.save(location)
    store_location = location.split("/static").pop()
    return jsonify({"location": store_location})

@apply_api.route("/club/<int:clubid>", methods=["GET"])
@logined_token_required
def get_apply_list(clubid, user):
    applies = Apply.get_list(clubid)
    res = {}
    res["applies"] = []
    for apply in applies:
        user = User.get_user_by_id(apply.userid)
        avatar = user.avatar
        apply = apply.to_dict()
        apply["avatar"] = avatar
        res["applies"].append(apply)

    return jsonify(res)

@apply_api.route("/<int:id>/accept", methods=["GET"])
@logined_token_required
def acccept(user, id):
    apply = Apply.get_by_id(id)
    uid = apply.userid
    cid = apply.clubid
    existed = UserClub.is_existed(uid, cid)
    res = {}
    if existed:
        res["message"] = "已经是社员"
        apply.accepted = 1
        Apply.update_accepted(apply)
        return jsonify(res)
    UserClub.create(uid, cid)
    apply.accepted = 1
    Apply.update_accepted(apply)
    res = {"message":"录入成功", "status": "ok", "error": "0"}
    return jsonify(res)

@apply_api.route("/<int:id>/reject", methods=["GET"])
@logined_token_required
def reject(user, id):
    apply = Apply.get_by_id(id)
    apply.rejected = 1
    Apply.update_rejected(apply)
    res = {"message": "已回拒"}
    return jsonify(res)
