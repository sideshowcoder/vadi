from bottle import route
from conf import config

@route('/', method='GET')
def index():
    html = '<html><head></head><body>'
    html += '<h1>Vermont Analyse Data Interface</h1>'
    html += '</ul>'
    html += '</body></html>'
    return str(html)
