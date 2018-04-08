#-*-coding: utf8 -*-
from flask import request, jsonify, Blueprint
from app.model.article import Article
article_api = Blueprint('article_api', __name__)
import json
from app.helps.somedangerous import get_token, logined_token_required
from app.helps.common import random_str
import os

@article_api.route("/club/<int:cid>", methods=["GET"])
def get_article(cid):
    #获取某个社团的文章
    pass


@article_api.route("/", methods=["POST"])
@logined_token_required
def new_article(user):
    data = request.get_data()
    jobj = json.loads(data)
    print "on new article"
    print jobj
    print type(jobj)
    content = jobj['content']
    uid = user.uid
    cid = jobj['cid']
    title = jobj['title']
    picture = jobj['picture']

    Article.create_new(uid, cid, title, content, picture)
    
    res = {"error": "0", "status": "ok", "message": "社团文章创建成功"}
    return jsonify(res)

@article_api.route("/test", methods=["POST"])
def test():
    return ("<div>return in test</div")


@article_api.route('/picture', methods=['POST'])
@logined_token_required
def update_avatar(user):
    data = request.get_data()
    # print data
    file = request.files['file']
    
    path = os.path.abspath(os.path.dirname(__file__)) + "/../static/uploads/article"
    if not os.path.exists(path):
        os.makedirs(path)

    fielname = random_str(16) + ".jpg"
    location = path + "/" + fielname
    file.save(location)
    store_location = location.split("/static").pop()
    return jsonify({"location": store_location})