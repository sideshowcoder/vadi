import os, csv, re

class AnalyseReader:
    def __init__(self, datadir):
        """Set the data directory to look for the data"""
        self.dd = datadir
        
    def readColumns(self, *cols):
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


