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
    pip install --editable .
```

Copy the default config
```sh
    cp backend/default_settings.py config.py
    export PPWB_CONFIG=$(pwd)/config.py
```

Run the debug server with
```sh
    flask run
```
