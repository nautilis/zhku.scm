from app.main  import db, Base
import time

class User(Base):
    uid = db.Column(db.Integer, primary_key=True)
    schoolid = db.Column(db.String(255), index=True)
    username = db.Column(db.String(255), index=True, default="")
    password = db.Column(db.String(255))
    sessionno = db.Column(db.String(50), default='0000')
    login_token = db.Column(db.String(1024))
    last_update_login_token = db.Column(db.Integer)

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


        
