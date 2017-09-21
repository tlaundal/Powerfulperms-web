from flask_restful import Resource, fields, marshal_with

class GroupSuffixes(Resource):

    types = {
        'id': fields.Integer,
        'suffix': fields.String,
        'server': fields.String
    }

    def __init__(self):
        self.db = GroupSuffixes.db

    @marshal_with(types)
    def get(self, groupId):
        return self.db.getGroupSuffixes(groupId)
