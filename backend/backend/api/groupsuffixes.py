from flask_restful import Resource

class GroupSuffixes(Resource):

    def __init__(self):
        self.db = GroupSuffixes.db

    def get(self, groupId):
        return [p.__dict__ for p in self.db.getGroupSuffixes(groupId)]
