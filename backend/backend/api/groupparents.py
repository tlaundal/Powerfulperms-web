from flask_restful import Resource

class GroupParents(Resource):

    def __init__(self):
        self.db = GroupParents.db

    def get(self, groupId):
        return [p.__dict__ for p in self.db.getGroupParents(groupId)]
