from .backend import user_db as db, SECRET_KEY
from passlib.apps import custom_app_context as pwd_context
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(32), index = True)
    password_hash = db.Column(db.String(128))

    def hash_password(self, password):
        """ Hash a password.
        Takes a plaintext password, hashes it and stores that hash.
        """
        self.password_hash = pwd_context.encrypt(password)

    def verify_password(self, password):
        """ Verify a password.
        Takes a plaintext password and verifies it agains the stored hash.
        """
        return pwd_context.verify(password, self.password_hash)

    def generate_auth_token(self, expiration = 600):
        """ Generate an auth token for this user.
        The auth token is specific to the user and has the given expiration.
        The secret key is used to encrypt it.
        """
        s = Serializer(SECRET_KEY, expires_in = expiration)
        return s.dumps({ 'id': self.id })

    @staticmethod
    def verify_auth_token(token):
        """ Verify the validity of an auth token.
        Returns the user associated with the token, or None if the token is
        expired or invalid.
        """
        s = Serializer(SECRET_KEY)
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None # valid token, but expired
        except BadSignature:
            return None # invalid token
        user = User.query.get(data['id'])
        return user
