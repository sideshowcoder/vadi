from bottle import run, debug
from app import routes
from app import conf


if conf.config['debug']:
    debug(True)
    run(reloader=True, port=conf.config['port'], host=conf.config['host'])
else:
    run(port=conf.config['port'], host=conf.config['host'])