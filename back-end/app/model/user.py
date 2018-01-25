from app.main  import db, Base

class User(Base):
    uid = db.Column(db.Integer, primary_key=True)
    schoolid = db.Column(db.Integer)
    username = db.Column(db.String(255))
    password = db.Column(db.String(255))

    def __init__(self, username):
        self.username=username

    def __repr__(self):
        return "<User `{}`>".format(self.username)

    @classmethod
    def find_user_by_schoolid(cls, schoolid):
        return cls.query.filter_by(schoolid=schoolid).first()

    @classmethod
    def new_user(cls, User):
        existed_user = User.find_user_by_schoolid(User.schoolid)
        if not existed_user:
            db.session.add(User)
            db.session.commit()
        
