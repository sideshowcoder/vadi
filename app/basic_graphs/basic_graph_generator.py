import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import csv, os, re, StringIO, Image

class BasicGraphGenerator:
    """Generate some basic graphs from data"""

    def __init__(self, datadir):
        """Set the data directory to look for when generating graphs"""
        self.dd = datadir
        
    def __read(self, *cols):
        res = dict()
        for c in cols:
            res[c] = []
        for datafile in filter(lambda n: re.search("dat", n), os.listdir(self.dd)):
            f = open(self.dd + '/' + datafile, 'r')
            dia = csv.Sniffer().sniff(f.read(4096), delimiters='\t ')
            f.seek(0)
            data = csv.reader(f, dia)
            for d in data:
                if re.search('#', d[0]):
                    continue
                for c in cols:
                    res[c].append(d[c])
        return res
        
    def __data2image(self, d1, d2):
        imgdata = StringIO.StringIO()
        fig = plt.figure()
        ax = fig.add_subplot(111)
        ax.plot(d1, d2)
        fig.savefig(imgdata, format='png')    
        imgdata.seek(0)
        return imgdata            
        
    def packets(self):
        data = self.__read(0, 1)
        return self.__data2image(data[0], data[1])
        
    def bytes(self):
        data = self.__read(0, 2)
        return self.__data2image(data[0], data[2])

    def duration(self):
        data = self.__read(0,3)
        return self.__data2image(data[0], data[3])
    
    def sources(self):
        data = self.__read(0,4)
        return self.__data2image(data[0], data[4])

    def destinations(self):
        data = self.__read(0,5)
        return self.__data2image(data[0], data[5])

    def nodes(self):
        data = self.__read(0,6)
        return self.__data2image(data[0], data[6])
        