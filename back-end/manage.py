#! /home/nautilis/local/env_web/bin/python
# -*- coding: utf-8 -*-
import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from app.main import app, db, Base
from app.model import User, Club
from app.model.user_club import UserClub
from app.model.admin_club import AdminClub
from app.model.article import Article
from app.model.employment import Employment
from app.model.activity import Activity
from flask_script import Server, Manager
from flask_migrate import Migrate, MigrateCommand


migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command("server", Server())
manager.add_command('db', MigrateCommand)

@manager.shell
def make_shell_content():
    return dict(app=app, db=db, User=User,
     Club=Club, UserClub=UserClub, 
     AdminClub=AdminClub, Article=Article,
     Employment = Employment
    )

if __name__ == "__main__":
    manager.run()
