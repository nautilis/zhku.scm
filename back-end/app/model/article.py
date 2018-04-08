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
    def get_last_by_limit(cls, limit):
        articles = cls.query.filter_by(can_show=1).order_by(desc(cls.date_created)).limit(limit).all()
        return articles
