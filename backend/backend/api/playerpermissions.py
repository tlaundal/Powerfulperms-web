from flask_restful import Resource, fields, marshal_with
from ..backend import database, auth

class PlayerPermissions(Resource):

    decorators = [auth.login_required]

    types = {
        'id': fields.Integer,
        'permission': fields.String,
        'world': fields.String,
        'server': fields.String,
        'expires': fields.DateTime(dt_format='iso8601')
    }

    def __init__(self):
        self.db = database

    @marshal_with(types)
    def get(self, playerUuid, permissionId=None):
        if permissionId is None:
            return self.db.getPlayerPermissions(playerUuid)
        else:
            permission = self.db.getPlayerPermissions(playerUuid, permissionId)
            if permission is None:
                return None, 404
            else:
                return permission
