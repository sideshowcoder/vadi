from bottle import route, template, request, response, validate, static_file, error, TEMPLATE_PATH
from conf import config, basic_grapher, APP_PATH, PUBLIC_PATH
status = 0

# Server Static files
@route('/static/:path#.+#')
def static_files(path):
    return static_file(path, root=PUBLIC_PATH)

# App routes
@route('/', method='GET')
def index():
    output = template('index')
    return output
    
@route('/analyse/start', method='POST')
def analyse_start():
    return "Running analysis"

@route('/analyse/stat', method='GET')
def analyse_stat():
    global status
    if( status < 110): 
        status = status + 10
    else:
        status = 0
    return str(status)
    
# Graphs
@route('/analyse/basic/packets', method='GET')
def img_packets():
    response.content_type = "image/png"
    return basic_grapher.packets()
    
@route('/analyse/basic/bytes', method='GET')
def img_bytes():
    response.content_type = "image/png"
    return basic_grapher.bytes()
    
@route('/analyse/basic/duration', method='GET')
def img_duration():
    response.content_type = "image/png"
    return basic_grapher.duration()

@route('/analyse/basic/srcs', method='GET')
def img_sources():
    response.content_type = "image/png"
    return basic_grapher.sources()

@route('/analyse/basic/dsts', method='GET')
def img_destinations():
    response.content_type = "image/png"
    return basic_grapher.destinations()

@route('/analyse/basic/nodes', method='GET')
def img_nodes():
    response.content_type = "image/png"
    return basic_grapher.nodes()

