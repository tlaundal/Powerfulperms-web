import MySQLdb
from .player import Player

class Database:

    def __init__(self, config):
        self.prefix = config['DATABASE_PREFIX']
        self.db = MySQLdb.connect(
            host=config['DATABASE_HOST'],
            user=config['DATABASE_USER'],
            passwd=config['DATABASE_PASS'],
            db=config['DATABASE_NAME'])

    def getPlayers(self):
        cursor = self.db.cursor()
        cursor.execute("SELECT uuid, name, prefix, suffix FROM {}players;".format(self.prefix))
        rows = cursor.fetchall()

        return [Player(row[0], row[1], row[2], row[3]) for row in rows]
