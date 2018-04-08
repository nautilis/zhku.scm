# -*- coding: utf8 -*-
from flask import Flask
from flask_cors import CORS
from app.config import DevConfig

#app 
app = Flask(__name__)
CORS(app)
app.config.from_object(DevConfig)

__all__ = ['app', 'db','Base']

# db
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy(app)

#Base db
class Base(db.Model):
    __abstract__=True
    
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    
    def to_dict(self):
        return {c.name: getattr(self, c.name, None) for c in self.__table__.columns}

#blue print register            
from app.api.user import user_api  
app.register_blueprint(user_api,  url_prefix='/api/v1/user')

from app.api.club import club_api
app.register_blueprint(club_api, url_prefix='/api/v1/club' )

from app.api.article import article_api
app.register_blueprint(article_api, url_prefix="/api/v1/article")

def main():
    app.run()

