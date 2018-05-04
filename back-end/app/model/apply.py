#-*- coding: utf-8 -*-
from app.main  import db, Base
import time
from sqlalchemy import desc
import pdb

class Apply(Base):
    apid = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer)
    clubid = db.Column(db.Integer)
    employmentid = db.Column(db.Integer)
    activityid = db.Column(db.Integer)
    applytype = db.Column(db.String(20))
    name = db.Column(db.String(50))
    phone = db.Column(db.String(50))
    filepath = db.Column(db.String(1024))
    rejected = db.Column(db.Integer, default=0)
    accepted = db.Column(db.Integer, default=0)

    @classmethod
    def create(cls, apply):
        db.session.add(apply)
        db.session.commit()

    @classmethod
    def get_list(cls, cid):
        applies = cls.query.filter_by(clubid=cid, rejected=0, accepted=0, applytype="employment").order_by(desc(cls.date_created)).all()
        return applies

    @classmethod
    def get_activity_applies(cls, acid):
        applies = cls.query.filter_by(activityid=acid, rejected=0, accepted=0, applytype="activity").order_by(desc(cls.date_created)).all()
        return applies

    @classmethod
    def get_by_id(cls, id):
        apply = cls.query.filter_by(apid=id).first()
        return apply

    @classmethod
    def update_accepted(cls, apply):
        cls.query.filter_by(apid=apply.apid).update({
            "accepted" : apply.accepted
        })
        db.session.commit()

    @classmethod
    def update_rejected(cls, apply):
        cls.query.filter_by(apid=apply.apid).update({
            "rejected": apply.rejected
        })
        db.session.commit()
