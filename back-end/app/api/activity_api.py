#-*-coding: utf8 -*-
from flask import Flask, jsonify, Blueprint, request, make_response
import time
activity_api = Blueprint('activity_api', __name__)
import json
from app.helps.somedangerous import get_token, logined_token_required
from app.helps.common import random_str
import time
import os
from app.model.activity import Activity 
from app.model.club import Club
import pdb

@activity_api.route("/",methods=["POST"])
@logined_token_required
def create(user):
    data = request.get_data()
    #print data
    jobj = json.loads(data)

    activity= Activity()
    activity.cid = jobj["cid"]
    activity.title = jobj["title"]
    activity.content = jobj["content"]
    activity.deadline = jobj["deadline"]
    activity.activity_time = jobj["activityTime"]
    activity.activity_address = jobj["activityAddress"]
    Activity.create(activity)

    res = {"message": "创建成功"}
    return jsonify(res)
