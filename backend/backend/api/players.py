from flask_restful import Resource

class Players(Resource):

    def __init(self):
        self.db = Players.db

    def get(self, playerUuid=None):
        if playerUuid is None:
            return [p.__dict__ for p in self.db.getPlayers()]
        else:
            player = self.db.getPlayer(playerUuid)
            if player is None:
                return None, 404
            else:
                return player.__dict__
