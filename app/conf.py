from os import path
from yaml import load

p = path.dirname(__file__)
cf = file(p + '/../configuration.yml', 'r')
config = load(cf)
    