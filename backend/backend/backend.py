from flask import Flask
from flask_restful import Resource, Api
from .db import Database
from .api import Players

app = Flask(__name__)
app.config.from_object("backend.default_settings")
app.config.from_envvar("PPWB_CONFIG", silent=True)

api = Api(app)

database = Database(app.config)

Players.db = database
api.add_resource(Players, '/', '/players')
