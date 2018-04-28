#-*- coding: utf-8 -*-
from app.main  import db, Base
import time

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
