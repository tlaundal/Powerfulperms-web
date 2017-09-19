import MySQLdb
from .player import Player
from .group import Group
from .permission import Permission
from .playergroup import PlayerGroup


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
        cursor.execute("""SELECT uuid, name, prefix, suffix
            FROM {}players;""".format(self.prefix))
        rows = cursor.fetchall()

        return [Player(row[0], row[1], row[2], row[3]) for row in rows]

    def getPlayer(self, playerUuid):
        cursor = self.db.cursor()
        cursor.execute("""SELECT uuid, name, prefix, suffix
            FROM {}players
            WHERE uuid = %s""".format(self.prefix), (playerUuid,))
        row = cursor.fetchone()

        return Player(row[0], row[1], row[2], row[3]) if row is not None else None

    def getPlayerPermissions(self, playerUuid):
        cursor = self.db.cursor()
        cursor.execute("""SELECT id, permission, world, server, expires
            FROM {}playerpermissions
            WHERE playeruuid = %s""".format(self.prefix), (playerUuid,))
        rows = cursor.fetchall()

        return [Permission(row[0], row[1], row[2], row[3], row[4]) for row in rows]

    def getPlayerGroups(self, playerUuid):
        cursor = self.db.cursor()
        cursor.execute(""" SELECT g.id, g.name, g.ladder, g.rank, pg.id, pg.server, pg.negated, pg.expires
            FROM {0}playergroups pg
            INNER JOIN {0}groups g ON pg.groupid = g.id
            WHERE pg.playeruuid = %s""".format(self.prefix), (playerUuid,))
        rows = cursor.fetchall()

        return [PlayerGroup(row[4], Group(row[0], row[1], row[2], row[3]), row[5], row[6], row[7]) for row in rows]

    def getGroups(self):
        cursor = self.db.cursor()
        cursor.execute("""SELECT id, name, ladder, `rank`
            FROM {}groups""".format(self.prefix))
        rows = cursor.fetchall()

        return [Group(row[0], row[1], row[2], row[3]) for row in rows]

    def getGroup(self, groupId):
        cursor = self.db.cursor()
        cursor.execute("""SELECT id, name, ladder, `rank`
            FROM {}groups
            WHERE id = %s""".format(self.prefix), (groupId,))
        row = cursor.fetchone()

        return Group(row[0], row[1], row[2], row[3]) if row is not None else None

    def getGroupPermissions(self, groupId):
        cursor = self.db.cursor()
        cursor.execute("""SELECT id, permission, world, server, expires
            FROM {}grouppermissions
            WHERE groupid = %s""".format(self.prefix), (groupId,))
        rows = cursor.fetchall()

        return [Permission(row[0], row[1], row[2], row[3], row[4]) for row in rows]

    def getGroupParents(self, groupId):
        cursor = self.db.cursor()
        cursor.execute("""SELECT g.id, g.name, g.ladder, g.rank
            FROM {0}groups g
            LEFT JOIN {0}groupparents p ON g.id = p.parentgroupid
            WHERE p.groupid = %s""".format(self.prefix), (groupId,))

    def getGroupPrefixes(self, groupId):
        cursor = self.db.cursor()
        cursor.execute("""SELECT id, prefix, server
            FROM {}groupprefixes
            WHERE groupid = %s""".format(self.prefix), (groupId))

    def getGroupSuffixes(self, groupId):
        cursor = self.db.cursor()
        cursor.execute("""SELECT id, suffix, server
            FROM {}groupsuffixes
            WHERE groupid = %s""".format(self.prefix), (groupId))
