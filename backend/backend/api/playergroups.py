from flask_restful import Resource, fields, marshal_with
from ..backend import database, auth
from .groups import Groups

class PlayerGroups(Resource):

    decorators = [auth.login_required]

    types = {
        'id': fields.Integer,
        'group': fields.Nested(Groups.types),
        'server': fields.String,
        'negated': fields.Boolean,
        'expires': fields.DateTime(dt_format='iso8601')
    }

    def __init__(self):
        self.db = database

    @marshal_with(types)
    def get(self, playerUuid):
        return self.db.getPlayerGroups(playerUuid)
