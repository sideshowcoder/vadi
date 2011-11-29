#!/usr/bin/env python

# extend the path to include libs in the lib directory
import sys
import os.path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'lib'))

# import bottle framework
from bottle import TEMPLATE_PATH, get, run, debug, template, request, validate, static_file, error
TEMPLATE_PATH.insert(0, os.path.join(os.path.dirname(__file__), "views"))

# parse the config
from yaml import load
config = load(file(os.path.join(os.path.dirname(__file__), "config.yml")))

# define routes
@get("/")
def index():
    return template("index")

@get("/static/:path#.+#")
def server_static(path):
    return static_file(path,root=os.path.join(os.path.dirname(__file__),"static"))

# start server
if __name__ == "__main__":
    debug(config["debug"])
    run(host=config["host"], port=config["port"],reloader=config["debug"])

