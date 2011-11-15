# Set Pythonpath
import sys
sys.path.append('../')
import utils
import simplejson as json

class DataServer:
    """Generate some basic graphs from data"""
    def __init__(self, datadir):
        self.r = utils.AnalyseReader(datadir)

    def packetsVsTime(self):
        res = dict()
        data = self.r.readColumns(0,1)
        res['time'] = data[0]
        res['packets'] = data[1]
        return json.dumps(res)

    def bytesVsTime(self):
        res = dict()
        data = self.r.readColumns(0,2)
        res['time'] = data[0]
        res['bytes'] = data[2]
        return json.dumps(res)

    def durationVsTime(self):
        res = dict()
        data = self.r.readColumns(0,3)
        res['time'] = data[0]
        res['duration'] = data[3]
        return json.dumps(res)
    
    def sourcesVsTime(self):
        res = dict()
        data = self.r.readColumns(0,4)
        res['time'] = data[0]
        res['sources'] = data[4]
        return json.dumps(res)

    def destinationsVsTime(self):
        res = dict()
        data = self.r.readColumns(0,5)
        res['time'] = data[0]
        res['destinations'] = data[5]
        return json.dumps(res)

    def nodesVsTime(self):
        res = dict()
        data = self.r.readColumns(0,6)
        res['time'] = data[0]
        res['nodes'] = data[6]
        return json.dumps(res)
        
        

