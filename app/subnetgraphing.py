import pydot, os, glob, re

from bottle import template

class Report:
    def __init__(self, name, filename):
        self.name = name
        self.filename = filename
        self.reportText = None
        self.imgFile = None
        self.reportData = list()

        self.graph = None

    def parseReport(self):
        try:
            f = open(self.filename, 'r')
            startTime = f.readline()
            endtime = f.readline()
            empty = f.readline()
            doc = f.readline()
            self.reportText = doc
            for line in f:
                m = re.match('(\S+)\s+(\d+) (\d+) (\d+) (\d+)', line) #(\d+) (\d+) (\d+) (\d+)', line)
                if m:
                    subnet = m.group(1)
                    bytesIn = m.group(2)
                    pktsIn = m.group(3)
                    bytesOut = m.group(4)
                    pktsOut = m.group(5)
    
                    self.reportData.append((subnet, bytesIn, pktsIn, bytesOut, pktsOut))
                self.reportText += line
            f.close()
        except Exception as inst:
            self.reportText = "Error reading report: %s" % (inst)
        return True

    def generateImage(self):
        self.graph = pydot.Dot(center="TRUE", graph_type="graph")
        inTraff  = pydot.Node("in", shape="circle")
        outTraff = pydot.Node("out", shape="circle")
        self.graph.add_node(inTraff)
        self.graph.add_node(outTraff)
    
        print len(self.reportData)
        for subnet in self.reportData:
            node = pydot.Node(subnet[0], shape = "circle")
            self.graph.add_node(node)
            if subnet[1] > 0 or subnet[2] > 0:
                edge = pydot.Edge(inTraff, node)
                self.graph.add_edge(edge)
            if subnet[3] > 0 or subnet[4] > 0:
                edge = pydot.Edge(outTraff, node)
        
        imgName = "imgs/" + self.name  + ".svg"
        print imgName
        self.graph.write_svg(imgName, prog="dot")
        self.imgFile = imgName
        return True

def show_subnet_reports(report, workdir):
    if not os.access(workdir, os.R_OK | os.W_OK):
        return "Error: No proper workdir configured"

    availReports = getReportList(workdir)
    reportText = None
    imageFile = None

    if report != "none":
        if report in availReports:
            r = availReports[report]
            if r.parseReport():
                reportText = r.reportText
            if r.generateImage():
                imageFile = r.imgFile
                
    return template('app/subnetgraphing', reports=availReports, text=reportText, image=imageFile)
        

def getReportList(workdir):
    reports = dict()
    for file in glob.glob( os.path.join(workdir, '*.report')):
            r = Report(os.path.basename(file), file)
            reports[r.name] = r
    return reports
    
