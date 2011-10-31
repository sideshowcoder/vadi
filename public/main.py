# Set Pythonpath
import sys
sys.path.append('../')

# Imports
from bottle import run, debug
import vadi 

if vadi.app.conf.config['debug']:
    debug(True)
    run(reloader=True, port=vadi.app.conf.config['port'], host=vadi.app.conf.config['host'])
else:
    run(port=conf.config['port'], host=vadi.app.conf.config['host'])