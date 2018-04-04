#-*- coding: utf-8 -*-
from app.main  import db, Base
import time

class AdminClub(Base):
    ca_id = db.Column(db.Integer, primary_key=True)
    u_id = db.Column(db.Integer)
    c_id = db.Column(db.Integer)

    @classmethod
    def get_club_admin_ids(cls,clubid):
        #获取社团管理员ids
        admins = cls.query.filter_by(c_id=clubid).all()
        ids = []
        for a in admins:
            ids.append(a.u_id)

        return ids

    @classmethod
    def is_admin(cls,userid, clubid):
        ids = cls.get_club_admin_ids(clubid)
        if userid in ids:
            return True

        return False