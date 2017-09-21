from flask_restful import Resource, fields, marshal_with

class Groups(Resource):

    types = {
        'id': fields.Integer,
        'name': fields.String,
        'ladder': fields.String,
        'rank': fields.Integer
    }

    def __init__(self):
        self.db = Groups.db

    @marshal_with(types)
    def get(self, groupId=None):
        if groupId is None:
            return self.db.getGroups()
        else:
            group = self.db.getGroups(groupId)
            if group is None:
                return None, 404
            else:
                return group
