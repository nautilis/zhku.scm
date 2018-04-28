#-*-coding: utf8 -*-
from flask import Flask, jsonify, Blueprint, request, make_response
import time
employment_api= Blueprint('employment_api', __name__)
import json
from app.helps.somedangerous import get_token, logined_token_required
from app.helps.common import random_str
import time
import os
from app.model.employment import Employment
import pdb

@employment_api.route("/", methods=["POST"])
@logined_token_required
def create_employment(user):
    data = request.get_data()
    #print data
    jobj = json.loads(data)

    employment = Employment()
    employment.title = jobj["title"]
    employment.content = jobj["content"]
    employment.deadline = jobj["deadline"]
    employment.interview_time = jobj["interviewTime"]
    employment.interview_address = jobj["interviewAddress"]
    employment.resume_file = jobj["resumeFile"]
    employment.cid = jobj["cid"]

    Employment.create_employment(employment)
    res = {"error": "0", "message": "成功发布招聘", "status": "ok"}
    return (jsonify(res))

@employment_api.route("/upload-resume", methods=["POST"])
@logined_token_required
def upload_resume(user):
    data = request.get_data()
    # print data
    file = request.files['file']

    path = os.path.abspath(os.path.dirname(__file__)) + "/../static/uploads/employment-file"
    if not os.path.exists(path):
        os.makedirs(path)
    
    fielname = random_str(16) + ".doc"
    location = path + "/" + fielname
    file.save(location)
    store_location = location.split("/static").pop()
    return jsonify({"location": store_location})

