from flask import Flask
from flask_restful import Resource, Api
from .db import Database
from .api import Players, PlayerPermissions, PlayerGroups
from .api import Groups, GroupPermissions, GroupParents, GroupPrefixes, GroupSuffixes

app = Flask(__name__)
app.config.from_object("backend.default_settings")
app.config.from_envvar("PPWB_CONFIG", silent=True)

api = Api(app)

database = Database(app.config)

Players.db = database
api.add_resource(Players, '/', '/players', '/players/<string:playerUuid>')

PlayerPermissions.db = database
api.add_resource(PlayerPermissions, '/players/<string:playerUuid>/permissions',
    '/players/<string:playerUuid>/permissions/<int:permissionId>')

PlayerGroups.db = database
api.add_resource(PlayerGroups, '/players/<string:playerUuid>/groups')

Groups.db = database
api.add_resource(Groups, '/groups', '/groups/<int:groupId>')

GroupPermissions.db = database
api.add_resource(GroupPermissions, '/groups/<int:groupId>/permissions',
    '/groups/<int:groupId>/permissions/<int:permissionId>')

GroupParents.db = database
api.add_resource(GroupParents, '/groups/<int:groupId>/parents')

GroupPrefixes.db = database
api.add_resource(GroupPrefixes, '/groups/<int:groupId>/prefixes')

GroupSuffixes.db = database
api.add_resource(GroupSuffixes, '/groups/<int:groupId>/suffixes')
