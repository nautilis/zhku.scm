#-*- coding: utf-8 -*-
from app.main  import db, Base
import time

class UserClub(Base):
    uc_id = db.Column(db.Integer, primary_key=True)
    u_id = db.Column(db.Integer)
    c_id = db.Column(db.Integer)

    @classmethod
    def get_users_club_ids(cls, userid):
        #获取用户社团ids
        clubs = cls.query.filter_by(u_id=userid).all()
        ids = []
        for c in clubs:
            ids.append(c.c_id)

        return ids

    @classmethod
    def is_existed(cls, userid, clubid):
        uc = cls.query.filter_by(u_id=userid, c_id=clubid).first()
        if uc:    
            return True
        return False

    @classmethod
    def create(cls, userid, clubid):
        uc = UserClub()
        uc.u_id = userid
        uc.c_id = clubid
        db.session.add(uc)
        db.session.commit()