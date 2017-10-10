# Backend
This is the backend for Powerfulperms-web. It is built using flask-restful.

## Setup
First of all you need a virtual environment. In this environment you should set the following environment variables (add the commands to venv/bin/activate)
```sh
export FLASK_APP=backend
export FLASK_DEBUG=true
```

Install the package and dependencies with
```sh
pip install .
```

Copy the default config
```sh
cp backend/default_settings.py config.py
export PPWB_CONFIG=$(pwd)/config.py
```

Install the default server with
```sh
python setup.py install
```

Create the user database and a user with
```sh
flask initdb
flask create_user <username> <password>
```

Start the default server with
```sh
flask run
```
