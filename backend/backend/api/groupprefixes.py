from flask_restful import Resource, fields, marshal_with

class GroupPrefixes(Resource):

    types = {
        'id': fields.Integer,
        'prefix': fields.String,
        'server': fields.String
    }

    def __init__(self):
        self.db = GroupPrefixes.db

    @marshal_with(types)
    def get(self, groupId):
        return self.db.getGroupPrefixes(groupId)
