from flask_restful import Resource

class Players(Resource):

    def get(self):
        return [p.__dict__ for p in Players.db.getPlayers()]
