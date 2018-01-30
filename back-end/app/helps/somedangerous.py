# -*- coding: utf-8 -*-
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired, BadSignature
from app.config import DevConfig
from functools import wraps
from flask import request, jsonify
from app.model.user import User
import time



def get_token(data={}, expiration=1440*31*60):
    s = Serializer(DevConfig.SECRET_KEY, expires_in=expiration)
    return s.dumps(data)  


def logined_token_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization')
        print ("token===>", token)
        if not token:
            return jsonify({'status': 'fail', 'error': '', "message": "您已经退出"})

        s = Serializer(DevConfig.SECRET_KEY)
        try:
            data = s.loads(token)
        except SignatureExpired:
            return jsonify({'status': 'fail', 'message': 'expired token'})
        except BadSignature:
            return jsonify({'status': 'fail', 'message': 'useless token'})

        schoolid = data['schoolid']
        user = User.find_user_by_schoolid(schoolid)
        if not user:
            return jsonify({'status': 'fail', 'message': 'invalidated token'})
        
        correct_token = user.login_token
        if correct_token != token:
            return jsonify({'status': 'fail', 'message': 'invalidated token'})

        expire_range = DevConfig.LOGIN_EXPIRE_RANGE
        now = time.time()
        if (now - user.last_update_login_token) > expire_range:
            return jsonify({'status': 'fail', 'message': 'expired token'})
    
        kwargs['user'] = user
        return func(*args, **kwargs)
    return wrapper