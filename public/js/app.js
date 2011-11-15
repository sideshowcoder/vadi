(function($){
  
  // Global Vars
  var delay = 1000, dynamic = true, dynGraph, staticGraph;

  // Static Graphing
  var staticGrapher = function(args){
    // make sure arguments persist
    that = this;
    that.root = args.root;
    that.nodeclass = args.nodeclass;

    // create object
    var grapher = {};
    
    // Image Urls
    var urls = {
      sources: '/analyse/basic/srcs',
      destinations: '/analyse/basic/dsts',
      nodes: '/analyse/basic/nodes',
      bytes: '/analyse/basic/bytes',
      packets: '/analyse/basic/packets'
    };

    // initialize Graphs
    grapher.init = function(){
      $(that.root).html('');
      for(var url in urls) {
        var html = '<h2>' + url + '</h2>';
        html += '<img class="' + that.nodeclass + '" src="' + urls[url] + '" />';
        $(that.root).append(html);
      }
    }

    // refresh Graphs
    grapher.refresh = function(){
      $(that.nodeclass).each(function(){
        var d = new Date();
        var src = $(this).attr('src');
        $(this).attr("src", src + '?' + d.getTime());
      });
    }

    return grapher;
  }


  // Dynamic Graphing
  var dynamicGrapher = function(args){
    // make sure arguments persist
    that = this;
    that.root = args.root;
    that.nodeclass = args.nodeclass;
    var grapher = {};

    // Data URLs
    var urls = {
      sources: '/analyse/data/srcsvstime',
      destinations: '/analyse/data/dstsvstime',
      nodes: '/analyse/data/nodesvstime',
      bytes: '/analyse/data/bytesvstime',
      packets: '/analyse/data/packetsvstime'
    };
    
    function createChartVis(data, localroot){
      var w = 500,
          h = 450,
          margin = 20,
          y = d3.scale.linear().domain([0, d3.max(data, parseInt)]).range([0 + margin, h - margin]),
          x = d3.scale.linear().domain([0, data.length]).range([0 + margin, w - margin])
      
      console.log(d3.max(data, parseInt));
      console.log(data.length);
      var vis = d3.select(localroot)
        .append("svg:svg")
        .attr("width", w)
        .attr("height", h);
      var g = vis.append("svg:g")
        .attr("transform", "translate(0, 400)");

      var line = d3.svg.line()
        .x(function(d,i) { return x(i); })
        .y(function(d) { return -1 * y(d); })
        
      g.append("svg:path").attr("d", line(data));
        
      g.append("svg:line")
        .attr("x1", x(0))
        .attr("y1", -1 * y(0))
        .attr("x2", x(data.length))
        .attr("y2", -1 * y(0))
       
      g.append("svg:line")
        .attr("x1", x(0))
        .attr("y1", -1 * y(0))
        .attr("x2", x(0))
        .attr("y2", -1 * y(d3.max(data, parseInt)))

      g.selectAll(".xLabel")
        .data(x.ticks(1))
        .enter().append("svg:text")
        .attr("class", "xLabel")
        .text(String)
        .attr("x", function(d) { return x(d) })
        .attr("y", 0)
        .attr("text-anchor", "middle")
       
      g.selectAll(".yLabel")
        .data(y.ticks(1))
        .enter().append("svg:text")
        .attr("class", "yLabel")
        .text(String)
        .attr("x", 0)
        .attr("y", function(d) { return -1 * y(d) })
        .attr("text-anchor", "right")
        .attr("dy", 4)
        
    }

    // initialize
    grapher.init = function(){
      $(that.root).html('');
      for(var url in urls){
        var success = (function(curl){
          return function(data){
            $(that.root).append('<div id=' + curl + '></div>');
            createChartVis(data[curl], '#' + curl);
          }
        })(url);
        $.get(urls[url], success);
      }
    }

    // refresh
    grapher.refresh = function(){

    }

    return grapher;
  }

  
  // Initialize graphs
  function setupGraphs(){
    var settings = { root: '#content', nodeclass: 'graph' };

    if(dynamic) {
      dynGraph = dynGraph || dynamicGrapher(settings);
      dynGraph.init();
    } else {
      staticGraph = staticGraph || staticGrapher(settings);
      staticGraph.init();
    }
  }

  // Update Graphs
  function refreshGraphs(){
    dynamic ? dynGraph.refresh() : staticGraph.refresh();
  }

  // Toggle View
  function toggleView(ev){
    btn = ev.target;
    console.log("Current View Dynamic: " + dynamic);
    if(dynamic){
      dynamic = false;
      $(btn).html('Switch to Dynamic View');
      setupGraphs();
    } else {
      dynamic = true;
      $(btn).html('Switch to Static View');
      setupGraphs();
    }
  }

  
  // Analyse
  function startAnalyse(){
    $.post('/analyse/start', function(data) {
      $('#status').html(data);
      $('#progress').show();
      $('#progress').progressbar({ disabled: false });
      window.setTimeout(checkStatus, delay);
    });
  }
  
  function checkStatus(){
    $.get('/analyse/stat', function(data) {
      if(data !== '100') {
        $('#progress').progressbar({ value: parseInt(data, 10) });
        window.setTimeout(checkStatus, delay);
      } else {
        $('#progress').progressbar({ disabled: true});
        $('#status').html('');        
        $('#progress').hide();
        reloadGraphs();
      }
    });
  }
  
  $(document).ready(function(){
    setupGraphs();
    $('#progress').progressbar({ value: 0 });
    $('#progress').progressbar({ disabled: true });
    $('#progress').hide();
    $('#analysebtn').click(startAnalyse);
    $('#toggleviewbtn').click(toggleView);
  });
  
})(jQuery);
