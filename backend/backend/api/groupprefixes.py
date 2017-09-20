from flask_restful import Resource

class GroupPrefixes(Resource):

    def __init__(self):
        self.db = GroupPrefixes.db

    def get(self, groupId):
        return [p.__dict__ for p in self.db.getGroupPrefixes(groupId)]
