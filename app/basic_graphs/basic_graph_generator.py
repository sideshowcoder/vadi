# Set Pythonpath
import sys
from os import path
sys.path.append(path.dirname( __file__ ) + '/../')

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import StringIO, Image
import utils

class BasicGraphGenerator:
    """Generate some basic graphs from data"""
    def __init__(self, datadir):
        self.r = utils.AnalyseReader(datadir)
        
    def __data2image(self, d1, d2):
        imgdata = StringIO.StringIO()
        fig = plt.figure()
        ax = fig.add_subplot(111)
        ax.plot(d1, d2)
        fig.savefig(imgdata, format='png')    
        imgdata.seek(0)
        return imgdata            
        
    def packets(self):
        data = self.r.readColumns(0, 1)
        return self.__data2image(data[0], data[1])
        
    def bytes(self):
        data = self.r.readColumns(0, 2)
        return self.__data2image(data[0], data[2])

    def duration(self):
        data = self.r.readColumns(0,3)
        return self.__data2image(data[0], data[3])
    
    def sources(self):
        data = self.r.readColumns(0,4)
        return self.__data2image(data[0], data[4])

    def destinations(self):
        data = self.r.readColumns(0,5)
        return self.__data2image(data[0], data[5])

    def nodes(self):
        data = self.r.readColumns(0,6)
        return self.__data2image(data[0], data[6])
        
