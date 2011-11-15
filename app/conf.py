from os import path
from yaml import load
from bottle import TEMPLATE_PATH

from basic_graphs.basic_graph_generator import BasicGraphGenerator
from data_server.data_server import DataServer

# get current filepath
APP_PATH = path.dirname( __file__ ) + '/../'
PUBLIC_PATH = APP_PATH + '/public'

# load config
cf = file(APP_PATH + '/configuration.yml', 'r')
config = load(cf)

# bottle configuration
TEMPLATE_PATH.append( APP_PATH + '/templates')

# init basic graphing
basic_grapher = BasicGraphGenerator(APP_PATH + '/flowalyzer_cache')
# init data server
data_server = DataServer(APP_PATH + '/flowalyzer_cache')
    
