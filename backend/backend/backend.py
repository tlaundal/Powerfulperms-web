# Setup the App
from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_httpauth import HTTPBasicAuth
from flask_restful import Api

from .cli import register_commands
from .auth import register_auth_endpoints
from .db import Database
from .token_endpoint import register_token_endpoint
from .health_check import register_health_check

from .api import Players, PlayerPermissions, PlayerGroups
from .api import (Groups, GroupPermissions, GroupParents, GroupPrefixes,
                  GroupSuffixes)


app = Flask(__name__)
app.config.from_object("backend.default_settings")
app.config.from_envvar("PPWB_CONFIG", silent=False)

SECRET_KEY = app.config['SECRET_KEY']

# Add support for CORS
CORS(app)

# Setup flask-SQLAlchemy
user_db = SQLAlchemy(app)

# Setup the CLI
register_commands(app, user_db)

# Initialize the authentication
auth = HTTPBasicAuth()
register_auth_endpoints(auth)

# Create our database connection to PowerfulPerms
database = Database(app.config)

# Add custom endpoints
register_token_endpoint(app, auth)
register_health_check(app)

# Initialize flask-RESTful
api = Api(app)

# Register the resources
api.add_resource(
    Players,
    '/players',
    '/players/<string:playerUuid>')
api.add_resource(
    PlayerGroups,
    '/players/<string:playerUuid>/groups')
api.add_resource(
    PlayerPermissions,
    '/players/<string:playerUuid>/permissions',
    '/players/<string:playerUuid>/permissions/<int:permissionId>')
api.add_resource(
    Groups,
    '/groups',
    '/groups/<int:groupId>')
api.add_resource(
    GroupParents,
    '/groups/<int:groupId>/parents')
api.add_resource(
    GroupPrefixes,
    '/groups/<int:groupId>/prefixes')
api.add_resource(
    GroupSuffixes,
    '/groups/<int:groupId>/suffixes')
api.add_resource(
    GroupPermissions,
    '/groups/<int:groupId>/permissions',
    '/groups/<int:groupId>/permissions/<int:permissionId>')
