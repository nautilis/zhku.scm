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