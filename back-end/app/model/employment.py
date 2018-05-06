#-*- coding: utf-8 -*-
from app.main  import db, Base
import time
from sqlalchemy import desc

class Employment(Base):
     eid = db.Column(db.Integer, primary_key=True)
     title = db.Column(db.String(255))
     content = db.Column(db.Text())
     deadline = db.Column(db.Date())
     interview_time = db.Column(db.Date())
     interview_address = db.Column(db.String(1024))
     resume_file = db.Column(db.String(1024))
     cid = db.Column(db.Integer)

     @classmethod
     def create_employment(cls, employment):
         db.session.add(employment)
         db.session.commit()

     @classmethod
     def update(cls, employment):
         cls.query.filter_by(eid=employment.eid).update({
             "title": employment.title,
             "content": employment.content,
             "deadline": employment.deadline,
             "interview_time": employment.interview_time,
             "interview_address": employment.interview_address,
         })
         db.session.commit()

     @classmethod
     def delete(cls,eid):
         cls.query.filter_by(eid=eid).delete()
         db.session.commit()

     @classmethod
     def get_by_id(cls, id):
         employment = cls.query.filter_by(eid=id).first()
         return employment

     @classmethod
     def get_employments(cls,limit):
        employments = cls.query.order_by(desc(cls.date_created)).limit(limit).all()
        return employments

     @classmethod
     def get_all_employments_of_club(cls, cid):
        employments = cls.query.filter_by(cid=cid).order_by(desc(cls.date_created)).all()
        return employments