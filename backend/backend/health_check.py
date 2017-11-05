from .backend import app
from flask import jsonify

@app.route('/')
def health_check():
    return jsonify({
        'service': "PowerfulPerms-Web",
        'version': '0.0.1'
    })
