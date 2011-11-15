from bottle import route, template, request, response, validate, static_file, error, TEMPLATE_PATH
from conf import config, basic_grapher, data_server, APP_PATH, PUBLIC_PATH
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

# Stub for analyser requests
@route('/analyse/start', method='POST')
def analyse_start():
    #FIXME run analyser
    return "Running analysis"

@route('/analyse/stat', method='GET')
def analyse_stat():
    #FIXME Check the Status for the analysis
    global status
    if( status < 110): 
        status = status + 10
    else:
        status = 0
    return str(status)
    
# Graphs basic images
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

# Output basic data
@route('/analyse/data/packetsvstime', method='GET')
def data_packetsvstime():
    response.content_type = "application/json"
    return data_server.packetsVsTime()
    
@route('/analyse/data/bytesvstime', method='GET')
def data_bytessvstime():
    response.content_type = "application/json"
    return data_server.bytesVsTime()

@route('/analyse/data/durationsvstime', method='GET')
def data_durationvstime():
    response.content_type = "application/json"
    return data_server.durationVsTime()

@route('/analyse/data/srcsvstime', method='GET')
def data_srcssvstime():
    response.content_type = "application/json"
    return data_server.sourcesVsTime()

@route('/analyse/data/dstsvstime', method='GET')
def data_dstsvstime():
    response.content_type = "application/json"
    return data_server.destinationsVsTime()

@route('/analyse/data/nodesvstime', method='GET')
def data_nodesvstime():
    response.content_type = "application/json"
    return data_server.nodesVsTime()
