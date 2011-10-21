from bottle import run, debug
from app import routes
from app import conf

if conf.config['debug']:
    debug(True)
    run(reloader=True)
else:
    run()
