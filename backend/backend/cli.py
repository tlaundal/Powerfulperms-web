import click
from .backend import app, user_db
from .user import User

@app.cli.command()
@click.argument('name')
@click.argument('password')
def create_user(name, password):
    print("Creating user '{}'...".format(name))

    user = User(username = name)
    user.hash_password(password)

    user_db.session.add(user)
    user_db.session.commit()
    print("Done")

@app.cli.command()
def initdb():
    print("Creating tables...")
    user_db.create_all()
    print("Done")
