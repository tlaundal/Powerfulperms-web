from flask_restful import Resource, marshal_with
from ..backend import database, auth
from .groups import Groups

class GroupParents(Resource):

    decorators = [auth.login_required]

    def __init__(self):
        self.db = database

    @marshal_with(Groups.types)
    def get(self, groupId):
        return self.db.getGroupParents(groupId)
