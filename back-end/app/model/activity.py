#-*- coding: utf-8 -*-
from app.main  import db, Base
import time
from sqlalchemy import desc

class Activity(Base):
    acid = db.Column(db.Integer, primary_key=True)
    cid = db.Column(db.Integer)
    title = db.Column(db.String(255))
    content = db.Column(db.Text())
    deadline = db.Column(db.Date())
    activity_time = db.Column(db.Date())
    activity_address = db.Column(db.String(255))

    @classmethod
    def create(cls, activity):
        db.session.add(activity)
        db.session.commit()
