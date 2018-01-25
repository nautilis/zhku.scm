from flask import Flask
from app.config import DevConfig

#app 
app = Flask(__name__)
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

#blue print register            
from app.api.user import user_api  
app.register_blueprint(user_api,  url_prefix='/api/v1/user')

def main():
    app.run()

