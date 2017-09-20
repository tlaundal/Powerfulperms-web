import MySQLdb
from .player import Player
from .group import Group
from .permission import Permission
from .playergroup import PlayerGroup
from .prefix import Prefix
from .suffix import Suffix


class Database:

    def __init__(self, config):
        self.prefix = config['DATABASE_PREFIX']
        self.db = MySQLdb.connect(
            host=config['DATABASE_HOST'],
            user=config['DATABASE_USER'],
            passwd=config['DATABASE_PASS'],
            db=config['DATABASE_NAME'])

    def getPlayers(self, playerUuid=None):
        query = """SELECT uuid, name, prefix, suffix
            FROM {}players""".format(self.prefix)

        if playerUuid is not None:
            query += " WHERE uuid = %s"

        cursor = self.db.cursor()
        cursor.execute(query, None if playerUuid is None else (playerUuid, ))

        if playerUuid is None:
            rows = cursor.fetchall()
            return [Player(row[0], row[1], row[2], row[3]) for row in rows]
        else:
            row = cursor.fetchone()
            return None if row is None else Player(row[0], row[1], row[2], row[3])

    def getPlayerPermissions(self, playerUuid, permissionId=None):
        query = """SELECT id, permission, world, server, expires
            FROM {}playerpermissions
            WHERE playeruuid = %s""".format(self.prefix)

        if permissionId is not None:
            query += " AND id = %s"

        cursor = self.db.cursor()
        cursor.execute(query, (playerUuid,) if permissionId is None else (playerUuid, permissionId))

        if permissionId is None:
            rows = cursor.fetchall()
            return [Permission(row[0], row[1], row[2], row[3], row[4]) for row in rows]
        else:
            row = cursor.fetchone()
            return None if row is None else Permission(row[0], row[1], row[2], row[3], row[4])

    def getPlayerGroups(self, playerUuid):
        cursor = self.db.cursor()
        cursor.execute(""" SELECT g.id, g.name, g.ladder, g.rank, pg.id, pg.server, pg.negated, pg.expires
            FROM {0}playergroups pg
            INNER JOIN {0}groups g ON pg.groupid = g.id
            WHERE pg.playeruuid = %s""".format(self.prefix), (playerUuid,))
        rows = cursor.fetchall()

        return [PlayerGroup(row[4], Group(row[0], row[1], row[2], row[3]), row[5], row[6], row[7]) for row in rows]

    def getGroups(self, groupId=None):
        query = """SELECT id, name, ladder, `rank`
            FROM {}groups""".format(self.prefix)

        if groupId is not None:
            query += " WHERE id = %s"

        cursor = self.db.cursor()
        cursor.execute(query, None if groupId is None else (groupId, ))

        if groupId is None:
            rows = cursor.fetchall()
            return [Group(row[0], row[1], row[2], row[3]) for row in rows]
        else:
            row = cursor.fetchone()
            return None if row is None else Group(row[0], row[1], row[2], row[3])

    def getGroupPermissions(self, groupId, permissionId=None):
        query = """SELECT id, permission, world, server, expires
            FROM {}grouppermissions
            WHERE groupid = %s""".format(self.prefix)

        if permissionId is not None:
            query += " AND id = %s"

        cursor = self.db.cursor()
        cursor.execute(query, (groupId,) if permissionId is None else (groupId, permissionId))

        if permissionId is None:
            rows = cursor.fetchall()
            return [Permission(row[0], row[1], row[2], row[3], row[4]) for row in rows]
        else:
            row = cursor.fetchone()
            return Permission(row[0], row[1], row[2], row[3], row[4])

    def getGroupParents(self, groupId):
        cursor = self.db.cursor()
        cursor.execute("""SELECT g.id, g.name, g.ladder, g.rank
            FROM {0}groups g
            LEFT JOIN {0}groupparents p ON g.id = p.parentgroupid
            WHERE p.groupid = %s""".format(self.prefix), (groupId,))

        rows = cursor.fetchall()
        return [Group(row[0], row[1], row[2], row[3]) for row in rows]

    def getGroupPrefixes(self, groupId):
        cursor = self.db.cursor()
        cursor.execute("""SELECT id, prefix, server
            FROM {}groupprefixes
            WHERE groupid = %s""".format(self.prefix), (groupId,))

        rows = cursor.fetchall()
        return [Prefix(row[0], row[1], row[2]) for row in rows]

    def getGroupSuffixes(self, groupId):
        cursor = self.db.cursor()
        cursor.execute("""SELECT id, suffix, server
            FROM {}groupsuffixes
            WHERE groupid = %s""".format(self.prefix), (groupId,))

        rows = cursor.fetchall()
        return [Suffix(row[0], row[1], row[2]) for row in rows]
