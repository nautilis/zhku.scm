#-*-coding: utf8 -*-
from flask import request, jsonify, Blueprint
from app.model.article import Article
from app.model.user import User
article_api = Blueprint('article_api', __name__)
import json
from app.helps.somedangerous import get_token, logined_token_required
from app.helps.common import random_str
import os

@article_api.route("/club/<int:cid>", methods=["GET"])
def get_club_article(cid):
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
def update_picture(user):
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

@article_api.route("/", methods=["GET"])
def get_all_article():
    articles = Article.get_last_by_limit(4)
    res = {}
    res["articles"] = []
    for a in articles:
        res["articles"].append(a.to_dict())
    
    return jsonify(res)

@article_api.route("/<int:cid>", methods=["GET"])
def get_article(cid):
    article = Article.get_article_by_id(cid)
    res = {}
    if article:
        res["error"] = "0"
        res["status"] = "ok"
        res["message"] = ""
        user_name = User.get_user_by_id(article.uid).username
        article = article.to_dict()
        article["username"] = user_name
        res['article'] = article
    else:
        res["error"] = "1"
        res["status"] = "404"
        res['message'] = "文章不存在了"
        res["article"] = {}
        
    return jsonify(res)
    

    
    