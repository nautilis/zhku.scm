#-*- coding: utf-8 -*-
from app.main  import db, Base
import time

class Apply(Base):
    apid = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer)
    employmentid = db.Column(db.Integer)
    activityid = db.Column(db.Integer)
    applytype = db.Column(db.String(20))
    name = db.Column(db.String(50))
    phone = db.Column(db.String(50))
    filepath = db.Column(db.String(1024))

    @classmethod
    def create(cls, apply):
        db.session.add(apply)
        db.session.commit()
