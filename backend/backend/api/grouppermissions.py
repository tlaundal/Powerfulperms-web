from flask_restful import Resource, fields, marshal_with
from ..backend import database, auth

class GroupPermissions(Resource):

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
    def get(self, groupId, permissionId=None):
        if permissionId is None:
            return self.db.getGroupPermissions(groupId)
        else:
            permission = self.db.getGroupPermissions(groupId, permissionId)
            if permission is None:
                return None, 404
            else:
                return permission
