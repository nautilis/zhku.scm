#! /home/nautilis/local/env_web/bin/python
import os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))
from app.main import app, db, Base
from app.model import User
from flask_script import Server, Manager
from flask_migrate import Migrate, MigrateCommand

migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command("server", Server())
manager.add_command('db', MigrateCommand)

@manager.shell
def make_shell_content():
    return dict(app=app, db=db, User=User)

if __name__ == "__main__":
    manager.run()
