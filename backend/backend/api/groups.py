from flask_restful import Resource

class Groups(Resource):

    def __init__(self):
        self.db = Groups.db

    def get(self, groupId=None):
        if groupId is None:
            return [g.__dict__ for g in self.db.getGroups()]
        else:
            group = self.db.getGroup(groupId)
            if group is None:
                return None, 404
            else:
                return group.__dict__
