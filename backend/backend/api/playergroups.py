from flask_restful import Resource

class PlayerGroups(Resource):

    def __init__(self):
        self.db = PlayerGroups.db

    def get(self, playerUuid):
        return [g.__dict__ for g in self.db.getPlayerGroups(playerUuid)]
