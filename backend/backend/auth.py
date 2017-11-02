from flask import make_response, jsonify, g
from .backend import auth
from .user import User

@auth.verify_password
def verify_password(username, password):
    if username.lower() == "token":
        user = User.verify_auth_token(password)
    else:
        user = User.query.filter_by(username = username).first()
        if not user or not user.verify_password(password):
            user = None

    if not user:
        return False
    else:
        g.user = user
        return True

@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 403)
