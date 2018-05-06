#-*- coding: utf-8 -*-
from app.main  import db, Base
import time
from sqlalchemy import desc

class Article(Base):
    aid=db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer)
    cid = db.Column(db.Integer)
    title = db.Column(db.String(255))
    content = db.Column(db.Text)
    picture = db.Column(db.String(2048))
    can_show = db.Column(db.Boolean())

    @classmethod
    def create_new(cls, uid, cid, title, content, picture):
        article = cls()
        article.uid = uid
        article.cid = cid
        article.title = title
        article.content = content
        article.picture = picture
        article.can_show = 1

        db.session.add(article)
        db.session.commit()

    @classmethod
    def update(cls, article):
        cls.query.filter_by(aid=article.aid).update({
            "title": article.title,
            "content": article.content,
        }) 
        db.session.commit()

    @classmethod
    def delete(cls, id):
        cls.query.filter_by(aid=id).delete()
        db.session.commit()

    @classmethod
    def get_last_by_limit(cls, limit):
        articles = cls.query.filter_by(can_show=1).order_by(desc(cls.date_created)).limit(limit).all()
        return articles

    @classmethod
    def get_article_by_id(cls, id):
        article = cls.query.filter_by(aid=id).first()
        if article.can_show:
            return article
        else:
            return None

    @classmethod
    def get_all_article_of_club(cls, clubid):
        articles = cls.query.filter_by(cid=clubid, can_show=1).all()
        if articles:
            return articles
        else:
            return []
