#-*- coding: utf-8 -*-
from app.main  import db, Base
import time

class Article(Base):
    aid=db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer)
    cid = db.Column(db.Integer)
    title = db.Column(db.String(255))
    content = db.Column(db.Text)
    picture = db.Column(db.String(2048))

    @classmethod
    def create_new(cls, uid, cid, title, content, picture):
        article = cls()
        article.uid = uid
        article.cid = cid
        article.title = title
        article.content = content
        article.picture = picture

        db.session.add(article)
        db.session.commit()
