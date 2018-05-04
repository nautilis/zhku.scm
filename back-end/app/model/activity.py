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

    @classmethod
    def get_by_id(cls, id):
        activity = cls.query.filter_by(acid=id).first()
        return activity

    @classmethod
    def get_activities(cls, limit):
        activity = cls.query.order_by(desc(cls.date_created)).limit(limit).all()
        return activity 

    @classmethod
    def get_activities_of_club(cls, clubid):
        activities = cls.query.filter_by(cid=clubid).order_by(desc(cls.date_created)).all()
        return activities
