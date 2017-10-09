from .backend import user_db as db
from passlib.apps import custom_app_context as pwd_context

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
