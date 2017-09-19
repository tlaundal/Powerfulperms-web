from flask_restful import Resource

class GroupPermissions(Resource):

    def __init__(self):
        self.db = GroupPermissions.db

    def get(self, groupId, permissionId=None):
        if permissionId is None:
            return [p.__dict__ for p in self.db.getGroupPermissions(groupId)]
        else:
            permission = self.db.getGroupPermissions(groupId, permissionId)
            if permission is None:
                return None, 404
            else:
                return permission.__dict__
