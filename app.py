#!/usr/bin/env python

# extend the path to include libs in the lib directory
import sys
import os.path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'lib'))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'app'))

# import bottle framework
from bottle import get, run, debug, template, request, validate, static_file, error

# parse the config
from yaml import load
config = load(file(os.path.join(os.path.dirname(__file__), "config.yml")))

# define routes
@get("/")
def index():
    return static_file("index.html",root=os.path.join(os.path.dirname(__file__),"static"))

@get("/charts/:chart#.+#")
def server_chart(chart):
    return static_file(chart,root=os.path.join(os.path.dirname(__file__),"chart"))

@get("/static/:path#.+#")
def server_static(path):
    return static_file(path,root=os.path.join(os.path.dirname(__file__),"static"))

@get("/subnet-report/images/:path#.+#")
def subnet_report_imgs(path):
    return static_file(path, root=os.path.join(os.path.dirname(__file__),"images"))

@get("/subnet-report/:report#.+#")
def server_subnetgraphs(report):
    if "subnetDir" in config:
        workdir = config['subnetDir']
    else:
        workdir = os.path.join("workdir", "SubnetGrapher")
    from subnetgraphing import show_subnet_reports
    return show_subnet_reports(report, workdir)

# start server
if __name__ == "__main__":
    debug(config["debug"])
    run(host=config["host"], port=config["port"],reloader=config["debug"])

