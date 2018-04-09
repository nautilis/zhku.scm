# -*-coding: utf-8 -*-
from app.main  import db, Base
from app.model.user_club import UserClub
from app.model.club import Club
import time

class User(Base):
    uid = db.Column(db.Integer, primary_key=True)
    schoolid = db.Column(db.String(255), index=True)
    password = db.Column(db.String(255))
    sessionno = db.Column(db.String(50), default='0000')
    login_token = db.Column(db.String(1024))
    last_update_login_token = db.Column(db.Integer) #the time of new token was recorded

    #base info of user
    bio = db.Column(db.Text)
    username = db.Column(db.String(255), index=True, default="")
    campus = db.Column(db.String(50))
    email = db.Column(db.String(255))
    gender = db.Column(db.Integer, default=0) # 1 man 2 womman 0 unknow
    avatar = db.Column(db.String(1024))


    def __init__(self):
        pass

    def __repr__(self):
        return "<User `{}`>".format(self.username)

    @classmethod
    def find_user_by_schoolid(cls, schoolid):
        return cls.query.filter_by(schoolid=schoolid).first()

    @classmethod
    def create_user(cls, User):
        existed_user = User.find_user_by_schoolid(User.schoolid)
        if not existed_user:
            db.session.add(User)
            db.session.commit()
            return 1

    @classmethod
    def update_login_token(cls, schoolid, token):
        now = time.time()
        cls.query.filter_by(schoolid=schoolid).update({
            'login_token': token,
            'last_update_login_token': now
        })
        db.session.commit()

    @classmethod
    def update_base_info(cls, user):
        '''schoolid, username, bio, campus, email, gender'''
        now = time.time()
        cls.query.filter_by(schoolid=user.schoolid).update({
            'username': user.username,
            'bio': user.bio,
            'gender': user.gender,
            'campus': user.campus,
            'email': user.email,
            'last_update_login_token': now
        })

        db.session.commit()

    @classmethod
    def update_avatar(cls, user, filepath):
        now = time.time()
        cls.query.filter_by(schoolid=user.schoolid).update({
            'avatar': filepath,
        })

        db.session.commit()

    @classmethod
    def get_all_clubs(cls, user):
        club_ids = UserClub.get_users_club_ids(user.uid)
        clubs = Club.find_clubs_by_ids(club_ids)
        return clubs

    @classmethod
    def get_user_by_id(cls, id):
        user = cls.query.filter_by(uid=id).first()
        return user


        


        
