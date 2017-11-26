## Setup the App
from flask import Flask
app = Flask(__name__)
app.config.from_object("backend.default_settings")
app.config.from_envvar("PPWB_CONFIG", silent=False)

SECRET_KEY = app.config['SECRET_KEY']

## Add support for CORS
from flask_cors import CORS
CORS(app)

## Setup flask-SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
user_db = SQLAlchemy(app)

## Setup the CLI
from .cli import create_user

## Initialize the authentication
from flask_httpauth import HTTPBasicAuth
auth = HTTPBasicAuth()
from .auth import verify_password

## Create our database connection to PowerfulPerms
from .db import Database
database = Database(app.config)

## Add custom endpoints
from .token_endpoint import get_auth_token
from .health_check import health_check

## Initialize flask-RESTful
from flask_restful import Resource, Api
api = Api(app)

# Register the resources
from .api import Players, PlayerPermissions, PlayerGroups
from .api import Groups, GroupPermissions, GroupParents, GroupPrefixes, GroupSuffixes

api.add_resource(Players,           '/players',
                                    '/players/<string:playerUuid>')
api.add_resource(PlayerGroups,      '/players/<string:playerUuid>/groups')
api.add_resource(PlayerPermissions, '/players/<string:playerUuid>/permissions',
                                    '/players/<string:playerUuid>/permissions/<int:permissionId>')
api.add_resource(Groups,            '/groups',
                                    '/groups/<int:groupId>')
api.add_resource(GroupParents,      '/groups/<int:groupId>/parents')
api.add_resource(GroupPrefixes,     '/groups/<int:groupId>/prefixes')
api.add_resource(GroupSuffixes,     '/groups/<int:groupId>/suffixes')
api.add_resource(GroupPermissions,  '/groups/<int:groupId>/permissions',
                                    '/groups/<int:groupId>/permissions/<int:permissionId>')
