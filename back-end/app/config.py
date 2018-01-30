class Config(object):
    pass

class ProdConfig(Config):
    pass

class DevConfig(Config):
    DEBUG=True
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://nautilis:nautilis123@127.0.0.1/scm_dev"
    SQLALCHEMY_TRACK_MODIFICATIONS=False
    SECRET_KEY="Iveryverysecret"
    LOGIN_EXPIRE_RANGE = 3600 * 31