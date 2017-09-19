from flask_restful import Resource

class PlayerPermissions(Resource):

    def __init__(self):
        self.db = PlayerPermissions.db

    def get(self, playerUuid, permissionId=None):
        if permissionId is None:
            return [p.__dict__ for p in self.db.getPlayerPermissions(playerUuid)]
        else:
            permission = self.db.getPlayerPermissions(playerUuid, permissionId)
            if permission is None:
                return None, 404
            else:
                return permission.__dict__
