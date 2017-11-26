from flask import jsonify


def register_health_check(app):
    @app.route('/')
    def health_check():
        return jsonify({
            'service': "PowerfulPerms-Web",
            'version': '0.0.1'
        })
