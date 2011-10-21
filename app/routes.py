from bottle import route, get, post, request
from conf import config

@get('/')
def index():
    html = '<html><head></head><body>'
    html += '<h1>Vermont Analyse Data Interface</h1>'
    html += '</ul>'
    html += '</body></html>'
    return str(html)
