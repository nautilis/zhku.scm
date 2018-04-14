#-*- coding: utf-8 -*-
from app.main  import db, Base
import time

class Club(Base):
    cid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    chairman = db.Column(db.String(255))
    memberno = db.Column(db.Integer)
    avatar = db.Column(db.String(1024))
    desc = db.Column(db.Text())
    address = db.Column(db.String(1024))

    def __init__(self):
        pass

    def __repr__(self):
        return "<Club `{}`>".format(self.name)

    @classmethod
    def get_all_clubs(cls):
        clubs = cls.query.all()
        return clubs

    @classmethod
    def find_club_by_id(cls, clubids):
        club = cls.query.filter_by(cid=clubids).first()
        return club

    @classmethod
    def find_clubs_by_ids(cls, clubids):
        clubs = cls.query.filter(cls.cid.in_(clubids)).all()
        return clubs

    @classmethod
    def update_club_info(cls, clubid, club):
        cls.query.filter_by(cid=clubid).update({
            "name": club.name,
            "chairman": club.chairman,
            "address": club.chairman,
            "desc": club.desc,
        })       
        db.session.commit()

    @classmethod
    def update_avatar(cls, clubid, path):
        cls.query.filter_by(cid=clubid).update({
            "avatar": path,
        })
        db.session.commit()

