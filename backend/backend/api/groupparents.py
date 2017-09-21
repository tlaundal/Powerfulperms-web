from flask_restful import Resource, marshal_with
from .groups import Groups

class GroupParents(Resource):

    def __init__(self):
        self.db = GroupParents.db

    @marshal_with(Groups.types)
    def get(self, groupId):
        return self.db.getGroupParents(groupId)
